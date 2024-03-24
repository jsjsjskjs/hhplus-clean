import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { LectureService } from "@root/lecture/service/lecture.service"
import {
  LectureRegistrationQueryDto,
  RegisterForLectureDto,
} from "@root/lecture/dto/lecture.dto"
import { ApiOperation } from "@nestjs/swagger"

@Controller("lecture")
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post("/register")
  @ApiOperation({ summary: "특강 신청" })
  async registerForLecture(@Body() dto: RegisterForLectureDto) {
    return this.lectureService.registerForLecture(dto)
  }

  @Get("/registrations")
  @ApiOperation({ summary: "특강 신청 목록 조회" })
  async getRegistrations(@Query() query: LectureRegistrationQueryDto) {
    return this.lectureService.getRegistrations(query)
  }
}
