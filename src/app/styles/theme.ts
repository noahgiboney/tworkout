import { extendTheme } from "@chakra-ui/react";
import { avatarTheme } from "./avatarTheme";
import { Kumbh_Sans } from "next/font/google";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

const customTheme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: {
          backgroundColor: "#600086",
          color: "#E9E4F2",
          _hover: { backgroundColor: "#E9E4F2", color: "#600086" },
        },
      },
    },
    Avatar: avatarTheme,
  },
  brand: {
    50: "#E9E4F2",
    100: "#D7A1F0",
    300: "#CB5BFF",
    800: "#600086",
    900: "#130030",
  },
  fonts: {
    heading: kumbhSans.style.fontFamily,
    body: kumbhSans.style.fontFamily,
  },
});

export default customTheme;
