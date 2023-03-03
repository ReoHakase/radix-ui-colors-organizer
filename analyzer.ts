import { RadixUiColors, z } from "./deps.ts";
import { TokenStudioColorSchema } from "./schema.ts";
import { camelCaseToWords } from "./string.ts";

const { default: _default, ...scales } = RadixUiColors;

console.log(
  "色の種類 Scales: ",
  Object.keys(scales).filter((shadeKey) => {
    // キャメルケースから単語ごとの小文字の配列へ変換する
    const words = camelCaseToWords(shadeKey);
    // もし、darkまたはaが含まれていたら、falseを返す
    return !words.includes("dark") && !words.includes("a");
  })
);
