import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    description: string;
}
