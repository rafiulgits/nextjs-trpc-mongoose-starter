import { publicProcedure, trpcRouter } from "../trpc";

export const userRouter = trpcRouter({
  getUsers: publicProcedure.query(async () => {
    return [{ id: 100, name: "Rafi" }, { id: 101, name: "Zack" }]
  })
})