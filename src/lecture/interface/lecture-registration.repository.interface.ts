import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { Client } from "@root/client/entities/client.entity"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { EntityManager } from "typeorm"

export abstract class ILectureRegistrationRepository {
  abstract findOneByClientIdAndLectureId(
    client: Client,
    lecture: Lecture,
    manager?: EntityManager,
  ): Promise<LectureRegistration> | null

  abstract findAllByClientId(
    client: Client,
    manager?: EntityManager,
  ): Promise<LectureRegistration[]>

  abstract create(
    client: Client,
    lecture: Lecture,
    manager?: EntityManager,
  ): Promise<LectureRegistration>
}
