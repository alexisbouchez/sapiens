import { BadRequestException, Injectable } from '@nestjs/common'
import { CloudinaryService } from '~/cloudinary/cloudinary.service'
import { PrismaService } from '~/prisma.service'
import { User } from '~/users/user.entity'
import { CreateProfileInput } from './dto/create-profile.input'

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(user: User, createProfileInput: CreateProfileInput) {
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

  async uploadAvatar(id: string, file: Express.Multer.File) {
    try {
      const url = (await this.cloudinary.uploadImage(file)).secure_url

      await this.prisma.profile.update({
        where: { id },
        data: { avatar: url },
      })
    } catch {
      throw new BadRequestException('Upload failed')
    }
  }

  findOneById(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      select: {
        user: { select: { id: true, name: true } },
        id: true,
        avatar: true,
        price: true,
      },
    })
  }

  query() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        price: true,
        avatar: true,
        user: { select: { id: true, name: true } },
      },
    })
  }
}
