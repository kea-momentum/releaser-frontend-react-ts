export type DateFormatReturnType = {
  longDateTime: string;
  shortDateTime: string;
  filterDateTime: string;
};

export function formatDate(
  dateTime: string | undefined,
): DateFormatReturnType | null {
  if (!dateTime) {
    return null;
  }
  const dateObject = new Date(dateTime);
  const year = dateObject.getFullYear().toString().slice(-2);
  const filterYear = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const longDateTime = `${year}.${month}.${day} ${hours}:${minutes}`;
  const shortDateTime = `${year}.${month}.${day}`;
  const filterDateTime = `${filterYear}-${month}-${day}`;
  return { longDateTime, shortDateTime, filterDateTime };
}

export function formatVersion(version: string): any {
  if (!version) {
    return null;
  }
}
