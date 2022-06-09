import { Module } from '@nestjs/common'
import { AuthModule } from '~/auth/auth.module'
import { PrismaService } from '~/prisma.service'
import { UsersRepository } from './users.repository'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [UsersResolver, UsersService, UsersRepository, PrismaService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
