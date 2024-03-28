import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { EntityManager, Repository } from "typeorm"
import { ILectureRepository } from "../interface/lecture.repository.interface"

@Injectable()
export class LectureRepository implements ILectureRepository {
  constructor(
    @InjectRepository(Lecture) private readonly respository: Repository<Lecture>,
  ) {}
  async findAll(manager?: EntityManager) {
    if (manager) {
      return manager.find(Lecture)
    } else {
      return this.respository.find()
    }
  }
  async findById(id: string, manager?: EntityManager) {
    if (manager) {
      return manager.findOne(Lecture, { where: { id } })
    } else {
      return this.respository.findOne({ where: { id } })
    }
  }
}
