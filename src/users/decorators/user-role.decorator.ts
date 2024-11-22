import { TypeUser } from '../../utils/enums';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: TypeUser[]) => SetMetadata('roles', roles);
