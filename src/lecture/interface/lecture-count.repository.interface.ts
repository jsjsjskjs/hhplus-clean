import { Lecture } from "@root/lecture/entites/lecture.entity"

export abstract class ILectureCountRepository {
  abstract checkLectureCount(lecture: Lecture): Promise<boolean>
}
