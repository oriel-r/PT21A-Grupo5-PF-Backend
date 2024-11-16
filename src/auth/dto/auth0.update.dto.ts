export class UpdateUserAuthDto {
    authId?: string;
    email?: string;
    name?: string;
    idNumber?: string;
    photo?: string;
    isProfileComplete: boolean;
  }