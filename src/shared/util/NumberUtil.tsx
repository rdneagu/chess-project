export function clampNumber(num: number, min: number, max = Infinity) {
  return Math.min(Math.max(num, min), max);
}

export function clampNumberWithWrap(num: number, min: number, max = Infinity) {
  if (num < min) {
    return max;
  }

  if (num > max) {
    return min;
  }

  return num;
}
