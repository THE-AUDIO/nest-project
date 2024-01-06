import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// recuperer l'utilisateur via @user()
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);