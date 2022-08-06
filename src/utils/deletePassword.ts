import { prisma } from "../server/db/client";

export const deletePassword = async (id: string) => {
  const response = await prisma.passwordToShare.delete({ where: { id } });
  return response;
};
