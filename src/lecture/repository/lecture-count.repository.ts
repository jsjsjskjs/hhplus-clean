import { Injectable } from "@nestjs/common"
import { ILectureCountRepository } from "@root/lecture/interface/lecture-count.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { LectureCount } from "@root/lecture/entites/lecture-count.entity"
import { DataSource, EntityManager, Repository } from "typeorm"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { Client } from "@root/client/entities/client.entity"
import { CheckLectureCountFailType } from "@root/shared/enum/lecture"

@Injectable()
export class LectureCountRepository implements ILectureCountRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(LectureCount) private readonly repository: Repository<LectureCount>,
    @InjectRepository(LectureRegistration)
    private readonly LectureRegistrationRepo: Repository<LectureRegistration>,
  ) {}
  async checkLectureCount(client: Client, lecture: Lecture) {
    return await this.dataSource.transaction(async (manager) => {
      const lectureCount = await manager.findOne(LectureCount, {
        where: { lecture: { id: lecture.id } },
        lock: { mode: "pessimistic_write" },
      })
      if (!lectureCount || lectureCount.count >= lectureCount.limit) {
        return { isPossible: false, type: CheckLectureCountFailType.COUNT }
      }
      //TODO: 이미 등록된 강의인지 확인, 예외 처리까지, 중복 강의 점검 코드를 이 곳으로 이동
      const registration = await manager.findOne(LectureRegistration, {
        relations: ["client", "lecture"],
        where: { client: { id: client.id }, lecture: { id: lecture.id } },
      })
      if (registration) {
        return { isPossible: false, type: CheckLectureCountFailType.REGISTRATION }
      }
      //강의 수강생 수 증가
      lectureCount.count += 1
      await manager.save(
        Object.assign(lectureCount, { lecture, count: lectureCount.count }),
      )
      return { isPossible: true, type: CheckLectureCountFailType.NONE }
    })
  }
}
