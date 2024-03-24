import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { ApiProperty } from "@nestjs/swagger"
import { Lecture } from "@root/lecture/entites/lecture.entity"
import { Client } from "@root/client/entities/client.entity"

@Entity()
export class LectureRegistration extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: () => Lecture })
  @ManyToOne(() => Lecture, (lecture) => lecture.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  lecture: Lecture

  @ApiProperty({ type: () => Client })
  @ManyToOne(() => Client, (client) => client.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  client: Client
}
