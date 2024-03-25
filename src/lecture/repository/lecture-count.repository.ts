import { Injectable } from "@nestjs/common"
import { ILectureCountRepository } from "@root/lecture/interface/lecture-count.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { LectureCount } from "@root/lecture/entites/lecture-count.entity"
import { DataSource, EntityManager, Repository } from "typeorm"
import { Lecture } from "@root/lecture/entites/lecture.entity"

@Injectable()
export class LectureCountRepository implements ILectureCountRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(LectureCount) private readonly repository: Repository<LectureCount>,
  ) {}
  async checkLectureCount(lecture: Lecture) {
    return await this.dataSource.transaction(async (manager: EntityManager) => {
      const lectureCount = await manager.findOne(LectureCount, {
        where: { lecture: { id: lecture.id } },
        lock: { mode: "pessimistic_write" },
      })
      if (!lectureCount || lectureCount.count >= lectureCount.limit) {
        return false
      }

      lectureCount.count += 1
      await manager.save(
        Object.assign(lectureCount, { lecture, count: lectureCount.count }),
      )
      return true
    })
  }
}
