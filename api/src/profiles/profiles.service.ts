import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma.service'
import { User } from '~/users/user.entity'
import { CreateProfileInput } from './dto/create-profile.input'

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createProfileInput: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        price: createProfileInput.price,
        user: {
          connect: { id: user.id },
        },
      },
      include: { user: { select: { id: true, name: true } } },
    })
  }

  findOneById(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      select: {
        user: { select: { id: true, name: true } },
        id: true,
        price: true,
      },
    })
  }

  query() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        price: true,
        user: { select: { id: true, name: true } },
      },
    })
  }
}
