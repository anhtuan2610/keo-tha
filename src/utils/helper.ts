import { isNil } from "lodash-es";

export const generateId = () => {
  const timestamp = new Date().valueOf().toString(); // Lấy timestamp
  const randomNumbers = Math.floor(Math.random() * 1e9) // Tạo số ngẫu nhiên 9 chữ số
    .toString()
    .padStart(9, "0"); // Đảm bảo luôn đủ 9 chữ số
  return timestamp + randomNumbers;
};

export const transformNumber = (_: any, originalValue: any) => {
  if (isNil(originalValue) || originalValue === "") {
    return undefined;
  }
  if (typeof originalValue === "string") {
    return Number(originalValue.replaceAll(",", ""));
  }
  return originalValue;
};
