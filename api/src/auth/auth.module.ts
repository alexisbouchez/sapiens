import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UsersModule } from '~/users/users.module'
import { PrismaService } from '~/prisma.service'

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
