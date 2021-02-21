import {
  Box,
  Flex,
  Input,
  PseudoBox,
  Text,
  useColorMode,
} from "@chakra-ui/core";
import { EditModalContent } from "components/EditModuleModal";
import { BG_COLOR } from "data/constants";
import React, { useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";
import { Action } from "types/action";
import { Instruction } from "types/instructions";
import { Automation, AutomationModule } from "types/modules";
import { addDataTypeField } from "utils/index";

interface Props {
  module: AutomationModule;
}

const AutomationsEdit: React.FC<Props> = ({ module }) => {
  const { colorMode } = useColorMode();
  const { actions, instructions } = useSelector(
    (state: RootState) => state.data
  );
  const [selected, setSelected] = useState<Automation[]>([]);
  const [search, setSearch] = useState("");

  const filteredActions = useMemo(() => {
    const combined = [
      ...addDataTypeField(Object.values(actions), "action"),
      ...addDataTypeField(Object.values(instructions), "instruction"),
    ];

    return combined.filter((action) => {
      const q = search.toLowerCase();
      const name = action.name.toLowerCase();
      const desc = action.description ? action.description.toLowerCase() : "";

      return name.includes(q) || desc.includes(q);
    });
  }, [actions, instructions]);

  const addAction = (action: Action | Instruction) => {
    if (action.dataType) {
      setSelected([
        ...selected,
        { type: action.dataType, automationId: action.id },
      ]);
    }
  };

  const update = () => {
    console.log("Update clicked");
  };

  return (
    <EditModalContent onSubmit={update}>
      <Flex>
        <Box h="100%">
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <Input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Search actions..."
              mb={4}
            />
            <Box
              borderWidth={filteredActions.length > 0 ? 1 : 0}
              borderRadius={4}
              maxH={400}
              overflowY="scroll"
            >
              {filteredActions.map((action) => {
                const isSelected = selected.some(
                  (item) => item.automationId === action.id
                );
                return (
                  <PseudoBox
                    key={`${action.dataType}-${action.id}`}
                    py={2}
                    px={4}
                    borderBottomWidth={1}
                    cursor={isSelected ? "default" : "pointer"}
                    backgroundColor={
                      isSelected
                        ? colorMode === "light"
                          ? "#efefef"
                          : "gray.700"
                        : colorMode === "light"
                        ? "#fff"
                        : BG_COLOR[colorMode]
                    }
                    _last={{ border: "none" }}
                    _hover={{
                      background: colorMode === "light" ? "#efefef" : "#2D3748",
                    }}
                    onClick={() => {
                      if (!isSelected) {
                        addAction(action);
                      }
                    }}
                  >
                    <Text fontWeight="bold">{action.name}</Text>
                    <Text color="grey">{action.description}</Text>
                  </PseudoBox>
                );
              })}
            </Box>
          </Scrollbars>
        </Box>
      </Flex>
    </EditModalContent>
  );
};

export default hot(module)(AutomationsEdit);
