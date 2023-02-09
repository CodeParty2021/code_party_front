/**
 * http://www.crockford.com/base32.html
 */

const BASE32_LETTERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/**
 * Base32の文字列でIDを生成する
 * @param length ID長
 * @returns 指定されたID長のBase32ID
 */
export const GenerateBase32ID = (length: number) => {
  let id = "";

  for (let i = 0; i < length; i++) {
    id += BASE32_LETTERS[Math.floor(Math.random() * BASE32_LETTERS.length)];
  }

  return id;
};

/**
 * 受け取った文字列をBase32でエンコードする
 * 例：iolabc123 => 100ABC123
 * @param str エンコードする文字列
 * @returns Base32でエンコードした文字列
 */
export const EncodeBase32 = (str: string) => {
  const upperStr = str.toUpperCase();
  const encodedStr = upperStr.replace(/[O]/g, "0").replace(/[IL]/g, "1");
  return encodedStr;
};
