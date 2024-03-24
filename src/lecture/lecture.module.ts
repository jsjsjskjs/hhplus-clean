import { Module } from "@nestjs/common"
import { LectureController } from "./controller/lecture.controller"
import { LectureService } from "./service/lecture.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { LectureRepository } from "@root/lecture/repository/lecture.repository"
import { LectureCountRepository } from "@root/lecture/repository/lecture-count.repository"
import { LectureRegistrationRepository } from "@root/lecture/repository/lecture-registration.repository"
import { LectureCount } from "@root/lecture/entites/lecture-count.entity"
import { ClientModule } from "@root/client/client.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, LectureRegistration, LectureCount]),
    ClientModule,
  ],
  controllers: [LectureController],
  providers: [
    LectureService,
    { provide: "ILectureRepository", useClass: LectureRepository },
    { provide: "ILectureCountRepository", useClass: LectureCountRepository },
    {
      provide: "ILectureRegistrationRepository",
      useClass: LectureRegistrationRepository,
    },
  ],
  exports: [LectureService],
})
export class LectureModule {}
