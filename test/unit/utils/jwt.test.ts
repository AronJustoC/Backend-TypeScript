import { Sign, ValidateToken } from "../../../src/utils/jwt.util";

describe("JWT test cases", () => {
  it("not plain password", async () => {
    const user = {
      _id: "123456",
      email: "test@test.com",
    };
    const token = await Sign(user);
    expect(token).not.toBe(user);
  });

  it("should verify a token", async () => {
    const user = {
      _id: "123456",
      email: "test@test.com",
    };
    const token = await Sign(user);
    const decoded = (await ValidateToken(token.token)) as { email: string };
    expect(decoded.email).toBe(user.email);
  });
});
