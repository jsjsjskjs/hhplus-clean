import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { Client } from "@root/client/entities/client.entity"
import { Lecture } from "@root/lecture/entites/lecture.entity"

export abstract class ILectureRegistrationRepository {
  abstract findOneByClientIdAndLectureId(
    client: Client,
    lecture: Lecture,
  ): Promise<LectureRegistration> | null

  abstract create(client: Client, lecture: Lecture): Promise<LectureRegistration>
}
