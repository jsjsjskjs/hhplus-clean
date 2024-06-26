import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common"
import { ILectureRepository } from "../interface/lecture.repository.interface"
import { LectureRegistrationQueryDto, RegisterForLectureDto } from "../dto/lecture.dto"
import { ILectureRegistrationRepository } from "../interface/lecture-registration.repository.interface"
import { ILectureCountRepository } from "../interface/lecture-count.repository.interface"
import { ClientService } from "../../client/service/client.service"
import { Lecture } from "../entites/lecture.entity"
import { LectureRegistration } from "../entites/lecture-registration.entity"
import { IResponse } from "../../shared/interface/res.interface"

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
      if (!client || !lecture) {
        throw new BadRequestException("사용자 혹은 강의 정보가 없습니다.")
      }
      //TODO: 수강신청 가능한 시간인지 확인
      const isOpenTime = this.checkLectureOpenTime(lecture)
      if (!isOpenTime) {
        throw new BadRequestException("강의 수강신청 시간이 아닙니다.")
      }
      //TODO: 이미 등록된 강의인지 확인, 예외 처리까지
      const registration =
        await this.iLectureRegistrationRepo.findOneByClientIdAndLectureId(client, lecture)
      if (registration) {
        throw new BadRequestException("이미 수강신청한 강의입니다.")
      }
      //TODO: 강의 등록 가능한지 확인(트랜잭션), 예외 처리까지
      const isPossible = await this.iLectureCountRepo.checkLectureCount(lecture)
      if (!isPossible) {
        throw new BadRequestException("강의 정원이 초과되었습니다.")
      }
      //TODO: 강의 등록
      return await this.iLectureRegistrationRepo.create(client, lecture)
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e
      }
      throw new ServiceUnavailableException("강의 등록에 실패했습니다.")
    }
  }

  async getRegistrations(query: LectureRegistrationQueryDto): Promise<IResponse> {
    try {
      const { userId, lectureId } = query
      const client = await this.clientService.findById(userId)
      const lecture = await this.iLectureRepo.findById(lectureId)
      if (!client || !lecture) {
        throw new BadRequestException("사용자 혹은 강의 정보가 없습니다.")
      }
      const registration =
        await this.iLectureRegistrationRepo.findOneByClientIdAndLectureId(client, lecture)
      return registration
        ? { message: "success", data: registration }
        : { message: "fail", data: null }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e
      }
      throw new ServiceUnavailableException("강의 신청 목록 조회에 실패했습니다.")
    }
  }

  private checkLectureOpenTime(lecture: Lecture): boolean {
    const now = new Date()
    return now >= lecture.openDate
  }
}
