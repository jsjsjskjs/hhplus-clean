import { Injectable } from "@nestjs/common"
import { ILectureRegistrationRepository } from "@root/lecture/interface/lecture-registration.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { Repository } from "typeorm"
import { Client } from "@root/client/entities/client.entity"
import { Lecture } from "@root/lecture/entites/lecture.entity"

@Injectable()
export class LectureRegistrationRepository implements ILectureRegistrationRepository {
  constructor(
    @InjectRepository(LectureRegistration)
    private readonly repository: Repository<LectureRegistration>,
  ) {}
  async findOneByClientIdAndLectureId(client: Client, lecture: Lecture) {
    return this.repository.findOne({
      relations: ["client", "lecture"],
      where: { client: { id: client.id }, lecture: { id: lecture.id } },
    })
  }
  async create(client: Client, lecture: Lecture) {
    const lectureRegistration = new LectureRegistration()
    lectureRegistration.client = client
    lectureRegistration.lecture = lecture
    return this.repository.save(lectureRegistration)
  }
}
