import type { Meta, StoryObj } from "@storybook/react";
import AnalyzingLoader from "./AnalyzingLoader";

const meta: Meta<typeof AnalyzingLoader> = {
  title: "Components/AnalyzingLoader",
  component: AnalyzingLoader,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AnalyzingLoader>;

export const Default: Story = {
  render: () => <AnalyzingLoader />,
};
