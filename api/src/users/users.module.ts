import { Module } from '@nestjs/common'
import { PrismaService } from '~/prisma.service'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
