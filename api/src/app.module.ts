import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      sortSchema: true,
    }),
    AuthModule,
    UsersModule,
    JobsModule,
  ],
})
export class AppModule {}
