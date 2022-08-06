import { prisma } from "../server/db/client";

export const deletePassword = async (id: string) => {
  const response = await prisma.passwordToShare.delete({ where: { id } });
  return response;
};

export const cleanupPasswords = async () => {
  const response = await prisma.passwordToShare.deleteMany({
    where: { destroyAt: { lte: new Date() } },
  });
  return response;
};
