import { Lecture } from "@root/lecture/entites/lecture.entity"

export abstract class ILectureRepository {
  abstract findById(id: string): Promise<Lecture>

  abstract findAll(): Promise<Lecture[]>
}
