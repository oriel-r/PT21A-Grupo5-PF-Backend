import { IsNotEmpty } from "class-validator";

export class FilesFromCreateCourse {

    img_file: Express.Multer.File[]
    video_file: Express.Multer.File[]
}