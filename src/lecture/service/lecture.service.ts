import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common"
import { ILectureRepository } from "@root/lecture/interface/lecture.repository.interface"
import {
  LectureRegistrationQueryDto,
  RegisterForLectureDto,
} from "@root/lecture/dto/lecture.dto"
import { ILectureRegistrationRepository } from "@root/lecture/interface/lecture-registration.repository.interface"
import { ILectureCountRepository } from "@root/lecture/interface/lecture-count.repository.interface"
import { ClientService } from "@root/client/service/client.service"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { IResponse } from "@root/shared/interface/res.interface"

@Injectable()
export class LectureService {
  constructor(
    @Inject("ILectureRepository") private readonly iLectureRepo: ILectureRepository,
    @Inject("ILectureRegistrationRepository")
    private readonly iLectureRegistrationRepo: ILectureRegistrationRepository,
    @Inject("ILectureCountRepository")
    private readonly iLectureCountRepo: ILectureCountRepository,
    private readonly clientService: ClientService,
  ) {}
  async registerForLecture(dto: RegisterForLectureDto): Promise<LectureRegistration> {
    try {
      const { userId, lectureId } = dto
      const client = await this.clientService.findById(userId)
      const lecture = await this.iLectureRepo.findById(lectureId)
      //TODO: 수강신청 가능한 시간인지 확인, 예외 처리까지
      const isOpenTime = this.checkLectureOpenTime(lecture)
      if (!isOpenTime) {
        throw new BadRequestException("강의 수강신청 시간이 아닙니다.")
      }
      //TODO: 이미 등록된 강의인지 확인, 예외 처리까지
      const registration =
        await this.iLectureRegistrationRepo.findOneByClientIdAndLectureId(client, lecture)
      console.log("registration", registration)
      if (registration) {
        throw new BadRequestException("이미 수강신청한 강의입니다.")
      }
      //TODO: 강의 등록 가능한지 확인(트랜잭션), 예외 처리까지
      const isPossible = await this.iLectureCountRepo.checkLectureCount(lecture)
      //TODO: 강의 등록
      if (!isPossible) {
        throw new BadRequestException("강의 정원이 초과되었습니다.")
      }
      return await this.iLectureRegistrationRepo.create(client, lecture)
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e
      }
      throw new ServiceUnavailableException("강의 등록에 실패했습니다.")
    }
  }

  async getRegistrations(query: LectureRegistrationQueryDto): Promise<IResponse> {
    //TODO: 내가 신청한 강의 목록만 볼 수 있도록 변경하자
    try {
      const { userId, lectureId } = query
      const client = await this.clientService.findById(userId)
      const lecture = await this.iLectureRepo.findById(lectureId)
      const registration =
        await this.iLectureRegistrationRepo.findOneByClientIdAndLectureId(client, lecture)
      console.log("registration", registration)
      return registration
        ? { message: "success", data: registration }
        : { message: "fail", data: null }
    } catch (e) {
      console.log(e)
    }
  }

  private checkLectureOpenTime(lecture: Lecture): boolean {
    const now = new Date()
    console.log("now", now)
    return now >= lecture.openDate
  }
}
