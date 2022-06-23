import { Module } from '@nestjs/common'
import { CloudinaryModule } from '~/cloudinary/cloudinary.module'
import { PrismaService } from '~/prisma.service'
import { ProfilesController } from './profiles.controller'
import { ProfilesRepository } from './profiles.repository'
import { ProfilesResolver } from './profiles.resolver'
import { ProfilesService } from './profiles.service'

@Module({
  imports: [CloudinaryModule],
  controllers: [ProfilesController],
  providers: [
    ProfilesResolver,
    ProfilesService,
    ProfilesRepository,
    PrismaService,
  ],
})
export class ProfilesModule {}
