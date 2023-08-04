import { trpc } from "../utils/trpc";

export default function Home() {
  const userRes = trpc.users.getUsers.useQuery();
  return (
    <div>
      <h1>TRPC</h1>
      {userRes.isLoading ? "Loading" : ""}
      <p>{JSON.stringify(userRes.data)}</p>
    </div>
  );
}
