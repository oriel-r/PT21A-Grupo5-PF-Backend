import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateLenguageDto{
@ApiProperty({
    name: 'name',
    description: 'lenguage name',
    example: 'Guarani'
})
@IsNotEmpty()
@IsString()
name: string

@ApiProperty({
    name: 'A refence image of the lenguage',
    description: 'in jpg or png, webp is more optimized or web, Max size 2MB'
})
@IsOptional()
image_url: string

@ApiProperty({
    name: 'courses',
    description: 'an array of courses names'
})
@IsOptional()
course: string[]

}