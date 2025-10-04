import { Role } from '../shared/models/role.enum';

export interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
}
