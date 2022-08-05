import { z } from "zod";

import { prisma } from "../db/client";
import { createRouter } from "./context";

export const passwordRouter = createRouter().mutation("post", {
  input: z.object({
    lifetime: z.number(),
    openWithPassword: z.string().nullish(),
    sharedPassword: z.string(),
  }),
  async resolve({ input }) {
    const { lifetime, openWithPassword, sharedPassword } = input;
    const now = new Date();
    const destroyAt = new Date(now.setTime(now.getTime() + lifetime * 1000));

    const storeInDB = await prisma.passwordToShare.create({
      data: { openWithPassword, sharedPassword, destroyAt },
    });
    return { success: true, data: storeInDB };
  },
});
