import { Meta, Story } from "@storybook/react";
import { AsurRaaText, AsurRaaTextProps } from "./AsurRaaText";

export default {
  component: AsurRaaText,
  title: "Components/Text",
} as Meta;

const Template: Story<AsurRaaTextProps> = (args) => <AsurRaaText {...args} />;
export const Primary = Template.bind({});

Primary.args = {
  children: "Hi AsurRaa",
};
