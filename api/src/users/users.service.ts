import { ConflictException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { PrismaService } from '~/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await hash(createUserInput.password, 10)

    try {
      const user = await this.prisma.user.create({ data: createUserInput })

      createUserInput.password = undefined

      return user
    } catch {
      throw new ConflictException('Email already in use.')
    }
  }

  async update(currentUser: User, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await hash(updateUserInput.password, 10)
    }

    try {
      const user = await this.prisma.user.update({
        data: updateUserInput,
        where: { id: currentUser.id },
      })

      updateUserInput.password = undefined

      return user
    } catch {
      throw new ConflictException('Email already in use.')
    }
  }
}
