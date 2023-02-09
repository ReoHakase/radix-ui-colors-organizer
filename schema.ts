import { z } from "./deps.ts";

export const ColorCssStringSchema = z.string();

export const TokenStudioColorSchema = z.object({
  value: ColorCssStringSchema,
  type: z.literal("color"),
  description: z.string().optional(),
});
