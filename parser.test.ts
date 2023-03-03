import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { parseColor } from "./parser.ts";

Deno.test("parseColor can parse a color", () => {
  // Arrange
  const rawScaleName = "amberDarkA";
  const rawColorName = "amberA3";
  const rawColorValue = "hsla(27, 100%, 49.9%, 0.094)";

  // Act
  const result = parseColor({
    rawScaleName,
    rawColorName,
    rawColorValue,
  });

  // Assert
  assertEquals(result, {
    scale: "amber",
    step: "3",
    isDark: true,
    isAlpha: true,
    value: "hsla(27, 100%, 49.9%, 0.094)",
  });
});
