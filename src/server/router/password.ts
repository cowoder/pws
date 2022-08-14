import { z } from "zod";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import * as trpc from "@trpc/server";
import CryptoJS from "crypto-js";

import { prisma } from "../db/client";
import { createRouter } from "./context";
import { deletePassword } from "../../utils/deletePassword";

export const decryptPassword = (encryptedPassword: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.SECRET_KEY!,
  );
  const password = bytes.toString(CryptoJS.enc.Utf8);
  return password;
};

export const passwordRouter = createRouter()
  .mutation("post", {
    input: z.object({
      lifetime: z.number(),
      openWithPassword: z.string().nullish(),
      sharedPassword: z.string(),
    }),
    async resolve({ input }) {
      const { lifetime, openWithPassword, sharedPassword } = input;
      const now = new Date();
      const destroyAt = new Date(now.setTime(now.getTime() + lifetime * 1000));
      const id = nanoid(36);

      const encryptedShared = CryptoJS.AES.encrypt(
        sharedPassword,
        process.env.SECRET_KEY!,
      ).toString();

      const salt = await bcrypt.genSalt(15);
      const hash = openWithPassword
        ? await bcrypt.hash(openWithPassword, salt)
        : undefined;

      const storeInDB = await prisma.passwordToShare.create({
        data: {
          id,
          openWithPassword: hash,
          sharedPassword: encryptedShared,
          destroyAt,
        },
      });
      return { success: true, data: storeInDB.id };
    },
  })
  .query("get", {
    input: z.object({ id: z.string(), password: z.string() }),
    async resolve({ input }) {
      const storedPassword = await prisma.passwordToShare.findFirst({
        where: { id: input.id },
        select: { sharedPassword: true, openWithPassword: true },
      });

      if (!storedPassword)
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the requested id",
        });

      const { sharedPassword, openWithPassword } = { ...storedPassword };
      if (!openWithPassword) {
        await deletePassword(input.id);
        return decryptPassword(sharedPassword);
      }

      const validPassword = await bcrypt.compare(
        input.password,
        openWithPassword,
      );

      if (!validPassword)
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      else {
        await deletePassword(input.id);
        return decryptPassword(sharedPassword);
      }
    },
  });
