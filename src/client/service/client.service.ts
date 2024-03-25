import { Inject, Injectable } from "@nestjs/common"
import { IClientRepository } from "../interface/client.repository.interface"
import { Client } from "../entities/client.entity"

@Injectable()
export class ClientService {
  constructor(
    @Inject("IClientRepository") private readonly iClientRepo: IClientRepository,
  ) {}
  async findById(id: string): Promise<Client> {
    const client = await this.iClientRepo.findById(id)
    return client
  }
}
