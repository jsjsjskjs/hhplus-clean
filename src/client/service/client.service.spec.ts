import { Test, TestingModule } from "@nestjs/testing"
import { ClientService } from "./client.service"
import { IClientRepository } from "../interface/client.repository.interface"
import { Client } from "../entities/client.entity"

describe("ClientService", () => {
  let service: ClientService
  let mockIClientRepo: jest.Mocked<IClientRepository>

  beforeEach(async () => {
    mockIClientRepo = {
      findById: jest.fn().mockResolvedValue(new Client()),
    }
    service = new ClientService(mockIClientRepo)
  })

  describe("findById", () => {
    it("should return a client", async () => {
      const client = await service.findById("1")
      expect(client).toBeInstanceOf(Client)
    })
  })
})
