import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

export const parameters = {
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#f4f4f5" },
      { name: "dark", value: "#09090b" },
    ],
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
