import { Injectable } from '@nestjs/common';
import { RolesService } from '../../usersComponent/roles/roles.service';
import { ROLES } from '../../../constants/roles.constants';
import { USERS_CATEGORIES } from '../../../constants/users-categories.constants';
import { UsersService } from '../../usersComponent/users/users.service';
import { UsersCategoriesService } from '../../usersComponent/users-categories/users-categories.service';
import { Users } from '../../usersComponent/users/models/users.model';

// TODO: вынести всё в Seeds
@Injectable()
export class InitializerService {
  constructor(
    private rolesService: RolesService,
    private usersCategoriesService: UsersCategoriesService,
    private usersService: UsersService,
  ) {
  }

  async initialization() {
    await InitializerService.findOrCreateSimpleConstants([
      {service: this.rolesService, constants: ROLES},
      {service: this.usersCategoriesService, constants: USERS_CATEGORIES},
    ]);

    await InitializerService.findOrCreateDifficultConstants([]);

    await this.findOrCreateAdminAccount();
    await this.findOrCreateUserAccount();
  }

  private static async findOrCreateSimpleConstants(data) {
    let constant;

    for (let i = 0; i < data.length; i++) {
      for (const key in data[i].constants) {
        constant = await this.getConstantByName(
          data[i].service,
          data[i].constants[key],
        );

        if (this.checkingForNull(constant)) {
          await this.createConstant(data[i].service, {
            name: data[i].constants[key],
          });
        }
      }
    }
  }

  private static async findOrCreateDifficultConstants(data) {
    let constant;

    for (let i = 0; i < data.length; i++) {
      for (const category in data[i].mainConstants) {
        for (const key in data[i].mainConstants[category]) {
          constant = await this.getConstantByName(
            data[i].mainService,
            data[i].mainConstants[category][key],
          );

          if (this.checkingForNull(constant)) {
            const obj = {name: data[i].mainConstants[category][key]};
            obj[data[i].foreignKey] = data[i].secondConstants[category];

            await this.createConstant(data[i].mainService, {...obj});
          }
        }
      }
    }
  }

  private static async getConstantByName(service, name) {
    return service.findByName(name);
  }

  private static checkingForNull(constant) {
    return constant === null;
  }

  private static async createConstant(service, data) {
    service.create(data);
  }

  private async findOrCreateAdminAccount() {
    const account = await this.usersService.findByEmail('admin@gmail.com');

    if (account === null) {
      const user: Users = await this.usersService.create({
        email: 'admin@gmail.com',
        password: 'adminAdmin',
      });

      await this.usersService.addRoleToUser({
        roleName: ROLES.ADMIN,
        userEmail: user.email,
      });
    }
  }

  private async findOrCreateUserAccount() {
    const account = await this.usersService.findByEmail('user@gmail.com');

    if (account === null) {
      await this.usersService.create({
        email: 'user@gmail.com',
        password: 'userUser',
      });
    }
  }
}
