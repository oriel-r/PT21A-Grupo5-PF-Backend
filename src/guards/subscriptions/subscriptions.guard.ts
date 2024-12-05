import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/courses/courses.service';
import { SubscriptionTypes } from 'src/enums/subscription-types.enum';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly coursesService: CoursesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Retrieve the required subscriptions names from metadata
    const requiredSubscriptions = this.reflector.getAllAndOverride<
      SubscriptionTypes[]
    >('subscriptions', [context.getHandler(), context.getClass()]);

    // Extract the request and user from context
    const request: Request = context.switchToHttp().getRequest();
    const user: User = (request as any).user;
    const courseId: string = request.body.courseId;

    // Ensure the user exists and their subscription is valid
    if (!user || !user.membership?.subscription?.name) {
      throw new UnauthorizedException('Usuario o suscripción no válidos.');
    }

    const course = await this.coursesService.findById(courseId);

    const requiredSubscription = course.category.name;
    console.log(requiredSubscription);

    const userSubscription = user.membership.subscription.name;

    const isAllowed =
      requiredSubscription === 'Basic' ||
      (requiredSubscription === 'Premium' &&
        (userSubscription === 'Premium' || userSubscription === 'Pro'));

    if (!isAllowed) {
      throw new UnauthorizedException('No cuenta con la suscripción adecuada.');
    }

    return true;
  }
}
