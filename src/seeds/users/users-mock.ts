import { Role } from 'src/enums/roles.enum';
const teacher = Role.TEACHER;
const admin = Role.ADMIN;
const user = Role.USER;
const standard = 'Standard';
const premium = 'Premium';
const pro = 'Pro';

export const usersMock = [
  {
    name: 'John Doe',
    email: 'teacher@teacher.com',
    password: 'Password123!',
    idNumber: '45679654',
    role: teacher,
  },
  {
    name: 'Alice Smith',
    email: 'admin@admin.com',
    password: 'Password123!',
    idNumber: '37659083',
    role: admin,
  },
  {
    name: 'Juan Perez',
    email: 'test_user_313795967@testuser.com',
    idNumber: '87654728',
    password: 'Password123!',
    subscription: standard,
    role: user,
  },
  {
    name: 'Maria Lopez',
    email: 'user1@standard.com',
    idNumber: '87654321',
    password: 'Password123!',
    subscription: standard,
    role: user,
  },
  {
    name: 'Carlos Ruiz',
    email: 'user2@standard.com',
    idNumber: '23456789',
    password: 'Password123!',
    subscription: standard,
    role: user,
  },
  {
    name: 'Ana Martinez',
    email: 'user3@standard.com',
    idNumber: '34567890',
    password: 'Password123!',
    subscription: standard,
    role: user,
  },
  {
    name: 'Luis Hernandez',
    email: 'user4@standard.com',
    idNumber: '45678901',
    password: 'Password123!',
    subscription: standard,
    role: user,
  },
  {
    name: 'Sofia Ramirez',
    email: 'user1@premium.com',
    idNumber: '56789012',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
  {
    name: 'Javier Fernandez',
    email: 'user2@premium.com',
    idNumber: '67890123',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
  {
    name: 'Isabella Torres',
    email: 'user3@premium.com',
    idNumber: '78901234',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
  {
    name: 'Diego Gomez',
    email: 'user4@premium.com',
    idNumber: '89012345',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
  {
    name: 'Valeria Morales',
    email: 'user5@premium.com',
    idNumber: '90123456',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
  {
    name: 'Miguel Vargas',
    email: 'user1@pro.com',
    idNumber: '12345067',
    password: 'Password123!',
    subscription: pro,
    role: user,
  },
  {
    name: 'Camila Rojas',
    email: 'user2@pro.com',
    idNumber: '23456178',
    password: 'Password123!',
    subscription: pro,
    role: user,
  },
  {
    name: 'Alejandro Castillo',
    email: 'user3@pro.com',
    idNumber: '34567289',
    password: 'Password123!',
    subscription: pro,
    role: user,
  },
  {
    name: 'Emilia Vega',
    email: 'user4@pro.com',
    idNumber: '45678390',
    password: 'Password123!',
    subscription: pro,
    role: user,
  },
  {
    name: 'Daniel Herrera',
    email: 'user5@pro.com',
    idNumber: '56789401',
    password: 'Password123!',
    subscription: pro,
    role: user,
  },
  {
    name: 'Lucia Perez',
    email: 'user6@pro.com',
    idNumber: '67890512',
    password: 'Password123!',
    subscription: pro,
    role: user,
  },
  {
    name: 'Mateo Diaz',
    email: 'user6@premium.com',
    idNumber: '78901623',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
  {
    name: 'Victoria Garcia',
    email: 'test_user_1309689138@testuser.com',
    idNumber: '89012734',
    password: 'Password123!',
    subscription: standard,   
    role: user,
  },
  {
    name: 'Sebastian Lopez',
    email: 'test_user_169518996@testuser.com',
    idNumber: '90123845',
    password: 'Password123!',
    subscription: standard,
    role: user,
  },
  {
    name: 'Martina Chavez',
    email: 'user7@premium.com',
    idNumber: '01234956',
    password: 'Password123!',
    subscription: premium,
    role: user,
  },
];

