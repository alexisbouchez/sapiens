import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import { PrismaService } from '~/prisma.service'
import { CreateUserInput } from './dto/create-user.input'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await hash(createUserInput.password, 10)

    try {
      const user = await this.prisma.user.create({ data: createUserInput })

      return user
    } catch {
      throw new ConflictException('Email already in use.')
    }
  }
}
