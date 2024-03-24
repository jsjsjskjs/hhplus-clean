import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Client } from "@root/client/entities/client.entity"
import { Repository } from "typeorm"
import { IClientRepository } from "@root/client/interface/client.repository.interface"

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async findById(id: string) {
    return this.repository.findOneOrFail({ where: { id } })
  }
}
