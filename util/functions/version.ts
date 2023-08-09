import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RELEASE_VERSION } from "@/constants";

export const handleVersion = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>,
) => {
  const { value } = event.currentTarget;
  if (value.length <= 1) {
    setValue(value);
  }
};

export const checkVersionType = (
  versionString: string,
): { type: string; parent: string; line: string } => {
  const numbers = versionString.split(".").map(Number);
  if (numbers[2] != 0) {
    if (numbers[2] == 1) {
      return {
        type: RELEASE_VERSION.PATCH,
        parent: `${numbers[0]}.${numbers[1]}.0`,
        line: "top",
      };
    } else {
      const patchNum = numbers[2] - 1;
      return {
        type: RELEASE_VERSION.PATCH,
        parent: `${numbers[0]}.${numbers[1]}.${patchNum}`,
        line: "",
      };
    }
  } else if (numbers[1] != 0 && numbers[2] == 0) {
    if (numbers[1] == 1) {
      return {
        type: RELEASE_VERSION.MINOR,
        parent: `${numbers[0]}.0.0`,
        line: "",
      };
    } else {
      const minorNum = numbers[1] - 1;
      return {
        type: RELEASE_VERSION.MINOR,
        parent: `${numbers[0]}.${minorNum}.0`,
        line: "",
      };
    }
  } else if (numbers[0] != 0 && numbers[1] == 0 && numbers[2] == 0) {
    if (numbers[0] > 0) {
      const majorNum = numbers[0] - 1;
      return {
        type: RELEASE_VERSION.MAJOR,
        parent: `${majorNum}.0.0`,
        line: "",
      };
    } else {
      return { type: RELEASE_VERSION.MAJOR, parent: "", line: "" };
    }
  }
  return { type: "", parent: "", line: "" };
};

export const checkValidVersion = (versionString: string) => {
  const numbers = versionString.split(".").map(Number);

  if (numbers.length === 3) {
    return true;
  } else false;
};
