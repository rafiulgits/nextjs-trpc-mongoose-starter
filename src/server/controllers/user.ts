import { User } from "@/schemas/user.schema"

export const UserController = {
  create: async (data: { name: string, email: string }) => {
    const user = new User(data)
    await user.save()
    return user
  },

  getAll: async () => {
    const users = await User.find().exec()
    return users
  }
}