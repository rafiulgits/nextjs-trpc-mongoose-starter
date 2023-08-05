import { publicProcedure, trpcRouter } from "../trpc";
import { UserController } from "../controllers/user";
import { z } from "zod";


export const userRouter = trpcRouter({
  getUsers: publicProcedure.query(async () => {
    return UserController.getAll()
  }),

  createUser: publicProcedure.
    input(z.object({ name: z.string(), email: z.string() })).
    mutation(async (data) => {
      return UserController.create(data.input)
    })
})