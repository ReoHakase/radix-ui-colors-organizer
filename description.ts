import {
  RadixColorsColorWithSemanticScales,
  RadixColorsScale,
  RadixColorsScaleCategory,
  RadixColorsStep,
  SemanticScaleSchema,
  semanticColorScales,
  SemanticScale,
} from "./schema.ts";

import { radixColorsScaleCategoryRecord } from "./schema.ts";

// Refer: https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale
const stepDescriptions: Record<RadixColorsStep, string> = {
  "1": "App background",
  "2": "Subtle background",
  "3": "UI element background",
  "4": "Hovered UI element background",
  "5": "Active / Selected UI element background",
  "6": "Subtle borders and separators",
  "7": "UI element border and focus rings",
  "8": "Hovered UI element border",
  "9": "Solid backgrounds",
  "10": "Hovered solid backgrounds",
  "11": "Low-contrast text",
  "12": "High-contrast text",
};

const getStepDescription = (step: RadixColorsStep) =>
  `[Step: ${step}] preferred for "${stepDescriptions[step]}".`;

const scaleCategoryDescriptions: Record<RadixColorsScaleCategory, string> = {
  bright: "designed for black text at any step",
  normal: "designed for black text at step 1~8, white text at step 9~12",
  metal: "designed for black text at step 1~8, white text at step 9~12",
  gray: "categorized as gray colors",
  overlay: "for overlaying purposes",
};

const getScaleDescription = (scale: RadixColorsScale) => {
  const capitalizedScale =
    scale.length > 0 ? scale[0].toUpperCase() + scale.slice(1) : "";
  const category = radixColorsScaleCategoryRecord[scale];
  return `[Scale: ${capitalizedScale}] ${scaleCategoryDescriptions[category]}.`;
};

const getSchemeDescription = (isDark: boolean) =>
  `[Scheme: ${isDark ? "Dark" : "Light"}]`;

const getPrimitiveScale = (
  scale: RadixColorsScale | SemanticScale
): RadixColorsScale => {
  const parseResult = SemanticScaleSchema.safeParse(scale);
  if (parseResult.success) {
    return semanticColorScales[parseResult.data];
  } else {
    return scale as RadixColorsScale;
  }
};

export const getDescription = (color: RadixColorsColorWithSemanticScales) => {
  const { scale, step } = color;
  return `${getScaleDescription(
    getPrimitiveScale(scale)
  )}\n${getStepDescription(step)}\n${getSchemeDescription(
    color.isDark
  )}\nBy @radix-ui/colors\n`;
};
