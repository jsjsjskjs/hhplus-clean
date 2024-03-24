import { Client } from "@root/client/entities/client.entity"

export abstract class IClientRepository {
  abstract findById(id: string): Promise<Client>
}
