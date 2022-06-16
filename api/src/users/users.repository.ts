import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    })
  }

  findOneByIdExcludingPassword(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, profile: true },
    })
  }
}
