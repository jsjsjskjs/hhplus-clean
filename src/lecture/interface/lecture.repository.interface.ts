import { Lecture } from "@root/lecture/entites/lecture.entity"
import { EntityManager } from "typeorm"

export abstract class ILectureRepository {
  abstract findAll(manager?: EntityManager): Promise<Lecture[]>
  abstract findById(id: string, manager?: EntityManager): Promise<Lecture>
}
