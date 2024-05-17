import { avatarAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  badge: {
    bg: "gray.500",
    border: "2px solid",
  },
  container: {
    borderRadius: "100%",
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    borderRadius: "xl",
  },
});

const superLg = defineStyle({
  width: 40,
  height: 40,
  fontSize: "6xl",
});

const sizes = {
  superLg: definePartsStyle({
    container: superLg,
    excessLabel: superLg,
    badge: {
      width: 8,
      height: 8,
      borderWidth: "6px",
    },
  }),
};

export const avatarTheme = defineMultiStyleConfig({ baseStyle, sizes });
