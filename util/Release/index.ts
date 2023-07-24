import { Alert } from "../Alert";

export class Release {
  static isPossibleCreate(title: string, summary: string, content: string) {
    if (title === "") {
      Alert.error("릴리즈 노트 제목을 작성해주세요");
      return false;
    } else if (summary === "") {
      Alert.error("릴리즈 노트 요약을 작성해주세요");
      return false;
    } else if (content === "") {
      Alert.error("릴리즈 노트 본문을 작성헤주세요");
      return false;
    } else {
      return true;
    }
  }
}
