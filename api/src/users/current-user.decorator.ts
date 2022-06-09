import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator((_, context) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req.user
})
