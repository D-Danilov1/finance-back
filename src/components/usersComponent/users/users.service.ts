import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { EntityService } from '../../../classes/core/entity.service';
import { findByEmail } from '../../../traits/find-by.trait';
import { RoleToUserDto } from './dto/role-to-user.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { randomUUID } from 'crypto';
import { ROLES } from '../../../constants/roles.constants';
import * as bcrypt from 'bcryptjs';
import { EntityModel } from '../../../classes/core/entity.model';
import { Roles } from '../roles/models/roles.model';

@Injectable()
export class UsersService extends EntityService {
  constructor(
    @InjectModel(Users) protected repository: typeof EntityModel<Users>,
    private rolesService: RolesService,
  ) {
    super(repository);
  }

  async create(dto: CreateUsersDto): Promise<EntityModel<Users>> {
    const candidate: EntityModel<Users> = await this.repository.findOne({
      where: {email: dto.email},
    });
    if (candidate) {
      throw new HttpException('A user with this Email already exists',
        HttpStatus.BAD_REQUEST);
    }

    dto.password = await UsersService.setPasswordToUser(dto.password);

    const id: string = randomUUID();
    const user: EntityModel<Users> = await this.repository.create({id: id, ...dto});

    const role: EntityModel<Roles> = await this.rolesService.findByName(ROLES.USER);
    // FIXME: надо как-то привести типы
    // @ts-ignore
    await user.$set('roles', [role.id]);

    return user;
  }

  private static async setPasswordToUser(password) {
    return await bcrypt.hash(password, 6);
  }

  findByEmail = findByEmail;

  async addRoleToUser(dto: RoleToUserDto) {
    const user = await this.repository.findOne({
      where: {email: dto.userEmail},
    });
    const role = await this.rolesService.findByName(dto.roleName);
    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    return await user.$add('roles', role.id);
  }

  async removeRoleToUser(dto: RoleToUserDto) {
    const user = await this.repository.findOne({
      where: {email: dto.userEmail},
    });
    const role = await this.rolesService.findByName(dto.roleName);
    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    return await user.$remove('roles', role.id);
  }
}
