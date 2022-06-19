import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, Min } from 'class-validator'

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNumber()
  @Min(150)
  price: number
}
