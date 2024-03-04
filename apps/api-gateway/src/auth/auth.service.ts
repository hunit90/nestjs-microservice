import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private userService: UserService,
  ) {}
  async signup(email: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let error
    try {
      const userId = await this.userService.findOneByEmail(email)
      if (userId) throw new BadRequestException()
      const newUserId = await this.userService.create(eamil, password)
      const accessToken = this.generateAccessToken(newUserId)
      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, {
        userId: newUserId,
        accessToken,
        refreshToken: refreshTokenEntity.token,
      })
    } catch (e) {
      await queryRunner.rollbackTransaction()
      error = e;
    } finally {
      await queryRunner.release()
      if (error) throw error
    }
  }
}
