import { Lecture } from "@root/lecture/entites/lecture.entity"
import { Client } from "@root/client/entities/client.entity"
import { CheckLectureCountReturn } from "@root/shared/enum/lecture"

export abstract class ILectureCountRepository {
  abstract checkLectureCount(
    client: Client,
    lecture: Lecture,
  ): Promise<CheckLectureCountReturn>
}
