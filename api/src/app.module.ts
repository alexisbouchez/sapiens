import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      sortSchema: true,
      context: ({ req }) => ({ req }),
      cors: { origin: true, credentials: true },
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
