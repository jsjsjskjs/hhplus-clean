export enum CheckLectureCountFailType {
  COUNT = "COUNT",
  REGISTRATION = "REGISTRATION",
  NONE = "NONE",
}

export interface CheckLectureCountReturn {
  isPossible: boolean
  type: CheckLectureCountFailType
}
