import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Client } from "@root/client/entities/client.entity"
import { ClientService } from "./service/client.service"
import { IClientRepository } from "@root/client/interface/client.repository.interface"
import { ClientRepository } from "@root/client/repository/client.repository"

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [
    ClientService,
    { provide: "IClientRepository", useClass: ClientRepository },
  ],
  exports: [ClientService],
})
export class ClientModule {}
