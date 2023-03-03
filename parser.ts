import { RadixColorsColorSchema } from "./schema.ts";
import type { RadixColorsColor } from "./schema.ts";
import { camelCaseToWords, extractNumbers } from "./string.ts";

type ParseColorProps = {
  rawScaleName: string; // e.g. "amberDarkA"
  rawColorName: string; // e.g. "amberA3"
  rawColorValue: string; // e.g. "hsla(27, 100%, 49.9%, 0.094)"
};

export const parseColor = ({
  rawScaleName,
  rawColorName,
  rawColorValue,
}: ParseColorProps): RadixColorsColor => {
  const rawScaleNameWords = camelCaseToWords(rawScaleName);
  const rawColorNameWords = camelCaseToWords(rawColorName);
  const isDark = rawScaleNameWords.includes("dark");
  const isAlpha = rawColorNameWords
    .map((word) => word.replace(/-?\d*\.?\d+/g, ""))
    .includes("a");
  const scale = rawScaleNameWords[0];

  const step = String(extractNumbers(rawColorName).slice(-1)[0]);

  return RadixColorsColorSchema.parse({
    scale,
    step,
    isDark,
    isAlpha,
    value: rawColorValue,
  });
};
