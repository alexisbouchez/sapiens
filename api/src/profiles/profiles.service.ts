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
        name: createProfileInput.name,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
  }

  findOneById(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      select: { userId: true, id: true, name: true },
    })
  }

  query() {
    return this.prisma.profile.findMany()
  }
}
