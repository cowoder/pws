import { createRouter } from "./context";
import { z } from "zod";

import { prisma } from "../db/client";

export const passwordRouter = createRouter().mutation("post", {
  input: z.object({
    destroyAt: z.date(),
    deleteAfterOpens: z.number(),
    openWithPassword: z.string().nullish(),
    sharedPassword: z.string(),
  }),
  async resolve({ input }) {
    const storeInDB = await prisma.passwordToShare.create({
      data: { ...input },
    });
    return { success: true, data: storeInDB };
  },
});
