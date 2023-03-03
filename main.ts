import { RadixUiColors } from "./deps.ts";
import {
  RadixColorsColor,
  TokenStudioColorSchema,
  semanticColorScales,
  RadixColorsColorWithSemanticScales,
  RadixColorsStep,
} from "./schema.ts";
import { parseColor } from "./parser.ts";
import { getDescription } from "./description.ts";
import { wordsToCamelCase } from "./string.ts";

const { default: _default, ...rawScales } = RadixUiColors;

// Parse original Radix Colors into custom types
const parsedRadixUiColors = new Set<RadixColorsColor>();

Object.entries(rawScales).forEach(([rawScaleName, rawScale]) => {
  Object.entries(rawScale).forEach(([rawColorName, rawColorValue]) => {
    try {
      const parsedColor = parseColor({
        rawScaleName,
        rawColorName,
        rawColorValue,
      });
      parsedRadixUiColors.add(parsedColor);
    } catch (err) {
      console.error(err);
    }
  });
});
// ======================

// Add semantic colors

const generateColorKey = (
  {
    scale,
    isAlpha,
    isDark,
    step,
  }: Omit<RadixColorsColorWithSemanticScales, "value">,
  containIsDark: boolean
) =>
  `${wordsToCamelCase([scale, isAlpha ? "a" : ""])}${
    containIsDark ? `.${isDark ? "dark" : "light"}` : ""
  }.${wordsToCamelCase([step])}`;

const parsedRadixUiColorsWithSemanticScales =
  new Set<RadixColorsColorWithSemanticScales>(parsedRadixUiColors);

Object.entries(semanticColorScales).forEach(
  ([semanticScaleName, primitiveScaleName]) => {
    (
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ] satisfies Array<RadixColorsStep>
    ).forEach((step) => {
      ([true, false] satisfies Array<RadixColorsColor["isDark"]>).forEach(
        (isDark) => {
          ([true, false] satisfies Array<RadixColorsColor["isAlpha"]>).forEach(
            (isAlpha) => {
              const color = {
                scale: semanticScaleName as keyof typeof semanticColorScales,
                step,
                isDark,
                isAlpha,
                value: `{colors.${generateColorKey(
                  {
                    scale: primitiveScaleName,
                    step,
                    isDark,
                    isAlpha,
                  },
                  true
                )}}`,
              } satisfies RadixColorsColorWithSemanticScales;
              parsedRadixUiColorsWithSemanticScales.add(color);
            }
          );
        }
      );
    });
  }
);

const tokensStudioPrimitiveColors = Object.fromEntries(
  Array.from(parsedRadixUiColorsWithSemanticScales)
    .filter((color) => !color.isAlpha)
    .map((color) => {
      const key = generateColorKey(color, true);
      const value = TokenStudioColorSchema.parse({
        value: color.value,
        type: "color",
        description: getDescription(color),
      });
      return [key, value];
    })
);

const tokensStudioLightModeColors = Object.fromEntries(
  Array.from(parsedRadixUiColorsWithSemanticScales)
    .filter((color) => !color.isAlpha && !color.isDark)
    .map((color) => {
      const key = generateColorKey(color, false);
      const value = TokenStudioColorSchema.parse({
        value: `{colors.${generateColorKey(color, true)}}`,
        type: "color",
        description: getDescription(color),
      });
      return [key, value];
    })
);

const tokensStudioDarkModeColors = Object.fromEntries(
  Array.from(parsedRadixUiColorsWithSemanticScales)
    .filter((color) => !color.isAlpha && color.isDark)
    .map((color) => {
      const key = generateColorKey(color, false);
      const value = TokenStudioColorSchema.parse({
        value: `{colors.${generateColorKey(color, true)}}`,
        type: "color",
        description: getDescription(color),
      });
      return [key, value];
    })
);

const tokensStudioConfig = {
  core: {
    colors: tokensStudioPrimitiveColors,
  },
  light: {
    colors: tokensStudioLightModeColors,
  },
  dark: {
    colors: tokensStudioDarkModeColors,
  },
  $metadata: {
    tokenSetOrder: ["core", "light", "dark"],
  },
};

// Export to JSON
Deno.writeFile(
  "./tokens.json",
  new TextEncoder().encode(JSON.stringify(tokensStudioConfig, null, 2))
);
