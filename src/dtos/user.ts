export interface UserCreateDto {
  name: string
  email: string
}

export interface UserDto extends UserCreateDto {
  id: string

}