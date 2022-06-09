import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findOneById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }
}
