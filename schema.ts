import { z } from "./deps.ts";

export const ColorCssStringSchema = z.string(); // TODO: Improve this

export const RadixColorsScaleSchema = z.enum([
  "amber",
  "blue",
  "bronze",
  "brown",
  "crimson",
  "cyan",
  "gold",
  "grass",
  "gray",
  "green",
  "indigo",
  "lime",
  "mauve",
  "mint",
  "olive",
  "orange",
  "pink",
  "plum",
  "purple",
  "red",
  "sage",
  "sand",
  "sky",
  "slate",
  "teal",
  "tomato",
  "violet",
  "yellow",
  "white",
  "black",
]);

export type RadixColorsScale = z.infer<typeof RadixColorsScaleSchema>;
export type RadixColorsScaleCategory =
  | "normal"
  | "bright"
  | "gray"
  | "metal"
  | "overlay";

export const radixColorsScaleCategoryRecord: Record<
  RadixColorsScale,
  RadixColorsScaleCategory
> = {
  amber: "bright",
  sky: "bright",
  mint: "bright",
  yellow: "bright",
  lime: "bright",
  tomato: "normal",
  crimson: "normal",
  red: "normal",
  pink: "normal",
  plum: "normal",
  violet: "normal",
  purple: "normal",
  indigo: "normal",
  blue: "normal",
  cyan: "normal",
  teal: "normal",
  grass: "normal",
  green: "normal",
  olive: "normal",
  brown: "normal",
  orange: "normal",
  bronze: "metal",
  gold: "metal",
  gray: "gray",
  slate: "gray",
  sage: "gray",
  sand: "gray",
  mauve: "gray",
  white: "overlay",
  black: "overlay",
} as const;

export const RadixColorsStepSchema = z.enum([
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
]);

export type RadixColorsStep = z.infer<typeof RadixColorsStepSchema>;

export const RadixColorsColorSchema = z.object({
  scale: RadixColorsScaleSchema,
  step: RadixColorsStepSchema,
  isDark: z.boolean(),
  isAlpha: z.boolean(),
  value: ColorCssStringSchema,
});

export type RadixColorsColor = z.infer<typeof RadixColorsColorSchema>;

export const TokenStudioColorSchema = z.object({
  value: ColorCssStringSchema,
  type: z.literal("color"),
  description: z.string().optional(),
});

export type TokenStudioColor = z.infer<typeof TokenStudioColorSchema>;

export const SemanticScaleSchema = z.enum([
  "primary",
  "info",
  "success",
  "warning",
  "danger",
]);

export type SemanticScale = z.infer<typeof SemanticScaleSchema>;

export const semanticColorScales = {
  primary: "plum",
  info: "cyan",
  success: "green",
  warning: "yellow",
  danger: "crimson",
} as const satisfies Record<SemanticScale, RadixColorsScale>;

export type RadixColorsColorWithSemanticScales = Omit<
  RadixColorsColor,
  "scale"
> & {
  scale: RadixColorsScale | SemanticScale;
};
