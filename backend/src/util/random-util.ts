export class RandomUtils {
  public randomNum(maxLen: number, minLen: number): number {
    return +Array.from(
      { length: 0 | (Math.random() * (maxLen - minLen + 1) + minLen) },
      () => 0 | (Math.random() * 9 + 1),
    ).join('');
  }

  public generateResetKey() {
    return this.randomNum(20, 20);
  }
}
