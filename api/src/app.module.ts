import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Context } from 'graphql-ws'
import { AuthModule } from './auth/auth.module'
import { ChatsModule } from './chats/chats.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      sortSchema: true,
      context: (context) => {
        if (context?.extra?.request) {
          return {
            req: {
              ...context?.extra?.request,
              headers: {
                ...context?.extra?.request?.headers,
                ...context?.connectionParams,
              },
            },
          }
        }

        return { req: context?.req }
      },
      cors: { origin: true, credentials: true },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    AuthModule,
    UsersModule,
    ChatsModule,
  ],
})
export class AppModule {}
