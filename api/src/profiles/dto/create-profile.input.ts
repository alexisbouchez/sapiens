import { Field, InputType } from '@nestjs/graphql'
import { IsString, MinLength } from 'class-validator'

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  @MinLength(1)
  name: string
}
