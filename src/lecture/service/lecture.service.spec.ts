import { Test, TestingModule } from "@nestjs/testing"
import { LectureService } from "./lecture.service"
import { ClientService } from "../../client/service/client.service"
import { ILectureRepository } from "../interface/lecture.repository.interface"
import { ILectureRegistrationRepository } from "../interface/lecture-registration.repository.interface"
import { ILectureCountRepository } from "../interface/lecture-count.repository.interface"
import { IClientRepository } from "../../client/interface/client.repository.interface"
import { Client } from "../../client/entities/client.entity"
import { Lecture } from "../entites/lecture.entity"
import { LectureRegistration } from "../entites/lecture-registration.entity"
import { BadRequestException } from "@nestjs/common"

describe("LectureService", () => {
  let lectureService: LectureService
  let mockILectureRepo: jest.Mocked<ILectureRepository>
  let mockILectureRegistrationRepo: jest.Mocked<ILectureRegistrationRepository>
  let mockILectureCountRepo: jest.Mocked<ILectureCountRepository>
  let mockClientService: Partial<ClientService>
  let mockIClientRepo: Partial<IClientRepository>

  beforeEach(() => {
    // Mock Repositories and Services 생성
    mockILectureRepo = {
      findById: jest.fn().mockResolvedValue(new Lecture()),
    }
    mockILectureRegistrationRepo = {
      findOneByClientIdAndLectureId: jest
        .fn()
        .mockResolvedValue(new LectureRegistration()),
      create: jest.fn().mockResolvedValue(new LectureRegistration()),
    }
    mockILectureCountRepo = {
      checkLectureCount: jest.fn().mockResolvedValue(true),
    }
    mockIClientRepo = { findById: jest.fn().mockResolvedValue(new Client()) }
    mockClientService = {
      findById: mockIClientRepo.findById,
    }
    // LectureService에 mock Repositories and Services 주입
    lectureService = new LectureService(
      mockILectureRepo,
      mockILectureRegistrationRepo,
      mockILectureCountRepo,
      mockClientService as ClientService,
    )
  })

  describe("registerForLecture", () => {
    it("사용자 정보가 없는 경우 400에러를 반환", async () => {
      try {
        mockClientService.findById = jest.fn().mockResolvedValueOnce(null)
        await lectureService.registerForLecture({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("사용자 혹은 강의 정보가 없습니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("강의 정보가 없는 경우 400에러를 반환", async () => {
      try {
        mockILectureRepo.findById = jest.fn().mockResolvedValueOnce(null)
        await lectureService.registerForLecture({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("사용자 혹은 강의 정보가 없습니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("강의 수강신청 시간이 아닌 경우 400에러를 반환", async () => {
      try {
        mockILectureRepo.findById = jest
          .fn()
          .mockResolvedValueOnce({ openDate: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        await lectureService.registerForLecture({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("강의 수강신청 시간이 아닙니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("이미 수강신청한 강의인 경우 400에러를 반환", async () => {
      try {
        mockILectureRepo.findById = jest
          .fn()
          .mockResolvedValueOnce({ openDate: new Date() })
        await lectureService.registerForLecture({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("이미 수강신청한 강의입니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("강의 정원이 초과된 경우 400에러를 반환", async () => {
      try {
        mockILectureRepo.findById = jest
          .fn()
          .mockResolvedValueOnce({ openDate: new Date() })
        mockILectureRegistrationRepo.findOneByClientIdAndLectureId = jest
          .fn()
          .mockResolvedValueOnce(null)
        mockILectureCountRepo.checkLectureCount = jest.fn().mockResolvedValueOnce(false)
        await lectureService.registerForLecture({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("강의 정원이 초과되었습니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("강의 등록에 성공하면 LectureRegistration을 반환", async () => {
      mockILectureRepo.findById = jest
        .fn()
        .mockResolvedValueOnce({ openDate: new Date() })
      mockILectureRegistrationRepo.findOneByClientIdAndLectureId = jest
        .fn()
        .mockResolvedValueOnce(null)
      mockILectureCountRepo.checkLectureCount = jest.fn().mockResolvedValueOnce(true)
      const result = await lectureService.registerForLecture({
        userId: "1",
        lectureId: "1",
      })
      expect(result).toBeInstanceOf(LectureRegistration)
    })
  })

  describe("getRegistrations", () => {
    it("사용자 정보가 없는 경우 400에러를 반환", async () => {
      try {
        mockClientService.findById = jest.fn().mockResolvedValueOnce(null)
        await lectureService.getRegistrations({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("사용자 혹은 강의 정보가 없습니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("강의 정보가 없는 경우 400에러를 반환", async () => {
      try {
        mockILectureRepo.findById = jest.fn().mockResolvedValueOnce(null)
        await lectureService.getRegistrations({ userId: "1", lectureId: "1" })
      } catch (e) {
        expect(e.message).toEqual("사용자 혹은 강의 정보가 없습니다.")
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it("강의 신청 목록이 있는 경우 IResponse를 반환", async () => {
      const result = await lectureService.getRegistrations({
        userId: "1",
        lectureId: "1",
      })
      expect(result).toEqual({ message: "success", data: new LectureRegistration() })
    })

    it("강의 신청 목록이 없는 경우 IResponse를 반환", async () => {
      mockILectureRegistrationRepo.findOneByClientIdAndLectureId = jest
        .fn()
        .mockResolvedValueOnce(null)
      const result = await lectureService.getRegistrations({
        userId: "1",
        lectureId: "1",
      })
      expect(result).toEqual({ message: "fail", data: null })
    })
  })
})
