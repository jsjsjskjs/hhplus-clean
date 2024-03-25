import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "../../shared/entity/time-stamp.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Lecture } from "../entites/lecture.entity"

@Entity()
export class LectureCount extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: () => Lecture })
  @OneToOne(() => Lecture, (lecture) => lecture.id, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  lecture: Lecture

  @ApiProperty({ type: Number })
  @Column({ nullable: false, default: 0 })
  count: number

  @ApiProperty({ type: Number })
  @Column({ nullable: false, default: 0 })
  limit: number
}
