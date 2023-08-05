import { UserCreateDto, UserDto } from "@/dtos/user"
import { User } from "@/server/schemas/user.schema"

export const UserController = {
  create: async (data: UserCreateDto) => {
    const user = new User(data)
    await user.save()
    return user
  },

  update: async (data: UserDto) => {
    let user = await User.findById(data.id)
    user.name = data.name
    user.email = data.email
    user.save()
    return user
  },

  remove: async (id: string) => {
    await User.findByIdAndRemove(id)
  },

  getAll: async () => {
    const users = await User.find().exec()
    return users
  }
}