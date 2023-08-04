import { User } from "@/schemas/user.schema";
import { publicProcedure, trpcRouter } from "../trpc";


export const userRouter = trpcRouter({
  getUsers: publicProcedure.query(async () => {
    const users = await User.find().exec()
    return users
  }),

  createUser: publicProcedure.mutation(async (data: any) => {
    const user = new User({ name: "rafi", email: "rafi@mail.com" })
    await user.save()
    return user
  })
})