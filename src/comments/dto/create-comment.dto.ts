import { IsEmail, IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator'
export class CreateCommentDto {
    @IsMongoId({ message: 'El postId debe ser un ID de MongoDB válido' })
    @IsNotEmpty()
    postId: string;
    @IsString()
    @MinLength(5)
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(5)
    body: string;
}
