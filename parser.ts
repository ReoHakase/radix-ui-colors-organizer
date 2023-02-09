import { z } from "./deps.ts";
import { ColorCssStringSchema, TokenStudioColorSchema } from "./schema.ts";

const ParseColorPropsSchema = z.object({
  color: ColorCssStringSchema,
  hueName: z.string().min(1),
  shadeName: z.string().min(1),
});

const ParseColorResultSchema = z.object({
  key: z.string().min(1),
  tokenStudioColorSchema: TokenStudioColorSchema,
});

export const parseColor = (
  props: z.infer<typeof ParseColorPropsSchema>
): z.infer<typeof ParseColorResultSchema> => {
  try {
    const { color, hueName, shadeName } = ParseColorPropsSchema.parse(props);
    return ParseColorResultSchema.parse({
      key: `${hueName}.${shadeName}`,
      tokenStudioColorSchema: {
        value: color,
        type: "color",
        description: `Color named "${shadeName}" in "${hueName}" from Radix UI Colors.`,
      },
    });
  } catch (error) {
    console.info(props);
    throw error;
  }
};
