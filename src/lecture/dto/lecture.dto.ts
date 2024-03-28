import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class RegisterForLectureDto {
  @ApiProperty() @IsNotEmpty() @IsUUID() userId: string
  @ApiProperty() @IsNotEmpty() @IsUUID() lectureId: string
}

export class LectureRegistrationQueryDto {
  @ApiProperty() @IsNotEmpty() @IsUUID() userId: string
  @ApiProperty() @IsNotEmpty() @IsUUID() lectureId: string
}

export class GetAllLectureQueryDto {
  @ApiProperty() @IsNotEmpty() @IsUUID() userId: string
}

export class GetAllRegisteredLectureQueryDto {
  @ApiProperty() @IsNotEmpty() @IsUUID() userId: string
}
