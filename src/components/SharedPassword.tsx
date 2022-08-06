import { trpc } from "../utils/trpc";

function SharedPassword({ id, password }: { id: string; password: string }) {
  const { data, isLoading, error } = trpc.useQuery([
    "password.get",
    { id, password },
  ]);
  if (isLoading) return <h1>Loading</h1>;
  return <h1>{data}</h1>;
}

export default SharedPassword;
