import { Module } from '@nestjs/common';
import { CronsService } from './crons.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'src/users/users.module';
import { EmailerModule } from 'src/emailer/emailer.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, EmailerModule, CoursesModule],
  providers: [CronsService],
})
export class CronsModule {}
