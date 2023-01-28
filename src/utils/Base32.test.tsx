import { EncodeBase32, GenerateBase32ID } from "./Base32";

describe("base32", () => {
  it("generate base32 id", () => {
    const id = GenerateBase32ID(4);
    expect(id).toBeTruthy();
  });

  it("encode base32", () => {
    const str = "0123IiLlOoabc";
    const encodedStr = EncodeBase32(str);
    expect(encodedStr).toBe("0123111100ABC");
  });
});
