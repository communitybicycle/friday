import { BoxProps, Heading, List, ListItem, Text } from "@chakra-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import Container from "../components/Container";

interface ParagraphProps {
  bold?: boolean;
  noMb?: boolean;
}

const Paragraph: React.FC<ParagraphProps & BoxProps> = ({
  bold,
  noMb,
  children,
  ...rest
}) => (
  <Text
    fontSize="lg"
    mb={noMb ? 0 : 4}
    fontWeight={bold ? "bold" : "default"}
    {...rest}
  >
    {children}
  </Text>
);

const Welcome: React.FC = () => {
  return (
    <Container>
      <Heading size="xl" mb={8}>
        Welcome to the Friday App!
      </Heading>
      <Paragraph>
        This application was developed to help you be more productive.
      </Paragraph>
      <Paragraph>
        This app is made up of dashboards that you can customize and dashboards
        contain various modules that achieve different things.
      </Paragraph>
      <Paragraph bold fontSize="xl">
        Modules
      </Paragraph>
      <Paragraph>
        Modules are various snippets of other functionalities, such as a select
        few actions/instructions, a miniature calendar, or a preview of a note.
      </Paragraph>
      <Paragraph bold fontSize="xl">
        Actions
      </Paragraph>
      <Paragraph>
        An action is a small piece of task run by your computer. The currently
        supported types are: <b>links</b>, <b>folders</b>, <b>applications</b>,
        and <b>command-line instructions</b>.
      </Paragraph>
    </Container>
  );
};

export default hot(module)(Welcome);
