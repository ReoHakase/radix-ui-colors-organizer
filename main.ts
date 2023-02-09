import { RadixUiColors, z } from "./deps.ts";
import { TokenStudioColorSchema } from "./schema.ts";
import { parseColor } from "./parser.ts";

const { default: _default, ...hues } = RadixUiColors;

const colorMap = new Map<string, z.infer<typeof TokenStudioColorSchema>>();

Object.entries(hues).forEach(([hueName, shades]) => {
  Object.entries(shades).forEach(([shadeName, colorCode]) => {
    const { key, tokenStudioColorSchema } = parseColor({
      color: colorCode,
      hueName,
      shadeName,
    });
    colorMap.set(key, tokenStudioColorSchema);
  });
});

const tokens = {
  colors: Object.fromEntries(colorMap),
};

const json = JSON.stringify(tokens, null, 2);

await Deno.writeTextFile("./tokens.json", json);
