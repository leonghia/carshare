export const parseNumericValue = (value: string): string => {
  if (value.trim().length === 0) return "";
  const parsed: string[] = [];
  const raw = value.split("");
  raw.forEach((e) => {
    if (!isNaN(Number(e))) parsed.push(e);
  });
  return parsed.join("");
};

export const parseTelValue = (value: string): string => {
  const input = parseNumericValue(value.split(" ").join(""));
  const firstGroup = input.slice(0, 4);
  const remaining = input.slice(4);
  const otherGroups = remaining.match(/.{1,3}/g) || [];
  return [firstGroup, ...otherGroups].join(" ");
};

export const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
