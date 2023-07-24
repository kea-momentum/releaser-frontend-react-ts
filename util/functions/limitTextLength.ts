import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const limitLength = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>,
  length: number,
) => {
  const { value } = event.currentTarget;
  if (value.length <= length) {
    setValue(value);
  }
};
