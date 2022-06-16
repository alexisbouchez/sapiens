import { Module } from '@nestjs/common'
import { PrismaService } from '~/prisma.service'
import { ProfilesRepository } from './profiles.repository'
import { ProfilesResolver } from './profiles.resolver'
import { ProfilesService } from './profiles.service'

@Module({
  providers: [
    ProfilesResolver,
    ProfilesService,
    ProfilesRepository,
    PrismaService,
  ],
})
export class ProfilesModule {}
