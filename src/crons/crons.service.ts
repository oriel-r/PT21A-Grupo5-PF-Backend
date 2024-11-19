import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { SendEmailDto } from 'src/emailer/dto/send-email.dto';
import { EmailerService } from 'src/emailer/emailer.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CronsService {
  constructor(
    private readonly emailerService: EmailerService,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  formatDate = (date: Date) => {
    const dateString = String(date);
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  filterCallback = (course: Course) => {
    const today = new Date();
    const courseDate = new Date(course.createdAt);
    const diffInTime = today.getTime() - courseDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays <= 7;
  };

  @Cron(CronExpression.EVERY_WEEK)
  async sendNewCoursesInfo() {
    const to = await this.usersService.findNewsletterList();
    const courses = await this.coursesService.findAllCourses();
    const latestCourses = courses.filter((course) =>
      this.filterCallback(course),
    );

    const message = `Checkout our new courses: ${latestCourses.map((course) => course.title)}`;
    const subject = 'New Courses Available';
    const from = 'Uniendo Culturas <no-reply@uniendoculturas.edu.ar>';
    // await this.emailerService.sendEmail({ from, to, subject, message });
    console.log(message);
  }
}
