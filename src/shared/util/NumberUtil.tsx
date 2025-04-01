export function clampNumberBetweenWrap(num: number, min: number, max: number) {
  if (num < min) {
    return max;
  }

  if (num > max) {
    return min;
  }

  return num;
}
