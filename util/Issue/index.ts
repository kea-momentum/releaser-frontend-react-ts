import { Alert } from "../Alert";

export class Issue {
  static isPossibleCreate(title: string, tag: string, content: string) {
    if (title === "") {
      Alert.error("이슈 제목을 작성해주세요");
      return false;
    } else if (tag === "") {
      Alert.error("이슈 태그를 선태해주세요");
      return false;
    } else if (content === "") {
      Alert.error("이슈 본문을 작성헤주세요");
      return false;
    } else {
      return true;
    }
  }
}
