import { Membership } from 'src/membership/entities/membership.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';

export class UserResponseAuthDto {
  id: string;
  name: string;
  email: string;
  idNumber: string;
  photo: string;
  membership: {
    id: string;
    subscription: {
      id: string;
      name: string;
    };
    payments:Array<Payment>
  };

  constructor(user: Partial<User>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.idNumber = user.idNumber;
    this.photo = user.photo;
    this.membership = {
      id: user.membership.id,
      subscription: {
        id: user.membership.subscription.id,
        name: user.membership.subscription.name,
      },
      payments: user.membership.payments
    };
  }
}
