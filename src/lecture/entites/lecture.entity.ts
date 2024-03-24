import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { LectureRegistration } from "@root/lecture/entites/lecture-registration.entity"
import { isArray } from "class-validator"
import { LectureCount } from "@root/lecture/entites/lecture-count.entity"

@Entity()
export class Lecture extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  name: string

  @ApiProperty({ type: "timestamp", nullable: false })
  @Column({ nullable: false })
  openDate: Date

  @ApiProperty({ type: "timestamp", nullable: false })
  @Column({ nullable: false })
  lectureDate: Date

  @ApiPropertyOptional({ type: () => LectureCount })
  @OneToOne(() => LectureCount, (lectureCount) => lectureCount.lecture, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  count?: LectureCount
}
