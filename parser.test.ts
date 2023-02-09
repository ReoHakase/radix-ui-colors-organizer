import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { parseColor } from "./parser.ts";

Deno.test("ParseColor can parse a 3-digits hex color", () => {
  const result = parseColor({
    color: "#000",
    hueName: "gray",
    shadeName: "black",
  });
  assertEquals(result, {
    key: "gray-black",
    tokenStudioColorSchema: {
      value: "#000",
      type: "color",
      description: 'Color named "black" in "gray" from Radix UI Colors.',
    },
  });
});

Deno.test("ParseColor can parse a 6-digits hex color", () => {
  const result = parseColor({
    color: "#101010",
    hueName: "gray",
    shadeName: "black",
  });
  assertEquals(result, {
    key: "gray-black",
    tokenStudioColorSchema: {
      value: "#101010",
      type: "color",
      description: 'Color named "black" in "gray" from Radix UI Colors.',
    },
  });
});

Deno.test("ParseColor can parse a hsl color", () => {
  const result = parseColor({
    color: "hsl(0, 0%, 0%)",
    hueName: "gray",
    shadeName: "black",
  });
  assertEquals(result, {
    key: "gray-black",
    tokenStudioColorSchema: {
      value: "hsl(0, 0%, 0%)",
      type: "color",
      description: 'Color named "black" in "gray" from Radix UI Colors.',
    },
  });
});

Deno.test("ParseColor can parse a hsla color", () => {
  const result = parseColor({
    color: "hsl(39, 70.0%, 99.0%)",
    hueName: "gray",
    shadeName: "black",
  });
  assertEquals(result, {
    key: "gray-black",
    tokenStudioColorSchema: {
      value: "hsl(39, 70.0%, 99.0%)",
      type: "color",
      description: 'Color named "black" in "gray" from Radix UI Colors.',
    },
  });
});
