import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}
  async findOneByEmail(email: string) {
    const pattern = { cmd: 'findOneByEmail' };
    const payload = email;
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async create(email: string, password: string) {
    const pattern = { cmd: 'create' };
    const payload = { email, password };
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async validateUser(email: string, password) {
    return '';
  }
}
