import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExcutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface UserAfterAuth {
  id: string;
}
