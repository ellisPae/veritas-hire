import type { Meta, StoryObj } from "@storybook/react";
import AnimatedBackgroundBlobs from "./AnimatedBackgroundBlobs";

const meta: Meta<typeof AnimatedBackgroundBlobs> = {
  title: "Components/AnimatedBackgroundBlobs",
  component: AnimatedBackgroundBlobs,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f4f4f5" },
        { name: "dark", value: "#0a0a0a" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedBackgroundBlobs>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors">
      <AnimatedBackgroundBlobs />
      <div className="absolute inset-0 flex items-center justify-center"></div>
    </div>
  ),
};
