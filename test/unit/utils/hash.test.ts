import { encrypt, compare } from "../../../src/utils/encrypt.util";

describe("Hashing test cases", () => {
  it("should return a hash", async () => {
    const value = "123456";
    const hash = await encrypt(value);
    expect(hash).not.toBe(value);
  });

  it("comparing two hashes should return true", async () => {
    const value = "123456";
    const hash = await encrypt(value);
    expect(await compare(value, hash)).toBe(true);
  });
});
