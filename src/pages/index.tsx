import { useMutation } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";

export default function Home() {
  const userRes = trpc.users.getUsers.useQuery();
  const userCreate = trpc.users.createUser.useMutation();

  const handleCreate = async () => {
    const res = await userCreate.mutateAsync();
    alert(JSON.stringify(res));
  };

  return (
    <div>
      <h1>TRPC</h1>
      <button onClick={handleCreate}>Create</button>
      {userRes.isLoading ? "Loading" : ""}
      <p>{JSON.stringify(userRes.data)}</p>
    </div>
  );
}
