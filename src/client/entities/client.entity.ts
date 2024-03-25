import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "../../shared/entity/time-stamp.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class Client extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: String, format: "email" })
  @Column({ nullable: false })
  email: string
}
