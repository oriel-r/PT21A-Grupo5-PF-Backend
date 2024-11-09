import { Role } from 'src/enums/roles.enum';
const teacher = Role.TEACHER;
const admin = Role.ADMIN;

export const usersMock = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Passw0rd!',
    idNumber: '45679654',
    role: teacher,
  },
  {
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    password: 'Alice1234$',
    idNumber: '37659083',
    role: admin,
  },
];
