import { Injectable } from "@nestjs/common"
import { ILectureRegistrationRepository } from "@root/lecture/interface/lecture-registration.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { EntityManager, Repository } from "typeorm"
import { Client } from "@root/client/entities/client.entity"
import { Lecture } from "@root/lecture/entites/lecture.entity"

@Injectable()
export class LectureRegistrationRepository implements ILectureRegistrationRepository {
  constructor(
    @InjectRepository(LectureRegistration)
    private readonly repository: Repository<LectureRegistration>,
  ) {}
  async findOneByClientIdAndLectureId(
    client: Client,
    lecture: Lecture,
    manager?: EntityManager,
  ) {
    const query = {
      relations: ["client", "lecture"],
      where: { client: { id: client.id }, lecture: { id: lecture.id } },
    }
    if (manager) {
      return manager.findOne(LectureRegistration, query)
    } else {
      return this.repository.findOne(query)
    }
  }
  async findAllByClientId(client: Client, manager?: EntityManager) {
    const query = {
      relations: ["client", "lecture"],
      where: { client: { id: client.id } },
    }
    if (manager) {
      return manager.find(LectureRegistration, query)
    } else {
      return this.repository.find(query)
    }
  }
  async create(client: Client, lecture: Lecture, manager?: EntityManager) {
    const lectureRegistration = new LectureRegistration()
    lectureRegistration.client = client
    lectureRegistration.lecture = lecture
    if (manager) {
      return manager.save(lectureRegistration)
    } else {
      lectureRegistration.client = client
      lectureRegistration.lecture = lecture
      return this.repository.save(lectureRegistration)
    }
  }
}
