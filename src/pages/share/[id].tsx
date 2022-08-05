import Container from "@mui/material/Container";

import { prisma } from "../../server/db/client";

import type { GetServerSideProps } from "next";

const Shared: React.FC<{
  sharedPassword?: string;
  requirePassword: boolean;
}> = ({ sharedPassword, requirePassword }) => {
  return (
    <Container>{requirePassword ? "need password" : sharedPassword}</Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shareId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  if (!shareId) return { notFound: true };
  const storedPassword = await prisma.passwordToShare.findFirst({
    where: { id: shareId },
    select: { sharedPassword: true, openWithPassword: true },
  });
  if (!storedPassword) return { notFound: true };
  const { sharedPassword, openWithPassword } = { ...storedPassword };
  if (openWithPassword) return { props: { requirePassword: true } };
  else return { props: { sharedPassword, requirePassword: false } };
};

export default Shared;
