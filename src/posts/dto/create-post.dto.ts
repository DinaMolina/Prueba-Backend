import { IsString, MinLength } from 'class-validator'

export class CreatePostDto {
    @IsString()
    @MinLength(5)
    title: string;
    @IsString()
    @MinLength(1)
    body: string;
    @IsString()
    @MinLength(5)
    author: string;
}
