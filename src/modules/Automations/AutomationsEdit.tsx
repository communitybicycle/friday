import { Flex, Input } from "@chakra-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { AutomationModule } from "../../types/modules";
import { EditModalContent } from "../../components/EditModuleModal";

interface Props {
  module: AutomationModule;
}

const AutomationsEdit: React.FC<Props> = ({ module }) => {
  const [search, setSearch] = useState("");

  const update = () => {
    console.log("Update clicked");
  };

  return (
    <EditModalContent onSubmit={update}>
      <Flex>
        <Input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search actions..."
        />
      </Flex>
    </EditModalContent>
  );
};

export default hot(module)(AutomationsEdit);
