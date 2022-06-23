import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module'
import { ProfilesModule } from './profiles/profiles.module'
import { ConfigModule } from '@nestjs/config'
import { CloudinaryModule } from './cloudinary/cloudinary.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
      subscriptions: { 'graphql-ws': true },
    }),
    AuthModule,
    UsersModule,
    ChatRoomsModule,
    ProfilesModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
