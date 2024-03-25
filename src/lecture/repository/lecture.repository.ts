import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { Repository } from "typeorm"
import { ILectureRepository } from "../interface/lecture.repository.interface"

@Injectable()
export class LectureRepository implements ILectureRepository {
  constructor(
    @InjectRepository(Lecture) private readonly respository: Repository<Lecture>,
  ) {}
  async findById(id: string) {
    return this.respository.findOne({ where: { id } })
  }
}
