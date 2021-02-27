import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  PseudoBox,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/core";
import { EditModalContent } from "components/EditModuleModal";
import { BG_COLOR } from "data/constants";
import React, { useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { editModule } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { Action } from "types/action";
import { Instruction } from "types/instructions";
import { Automation, AutomationModule } from "types/modules";
import { addDataTypeField } from "utils/index";

interface Props {
  module: AutomationModule;
}

const AutomationsEdit: React.FC<Props> = ({ module }) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { actions, instructions } = useSelector(
    (state: RootState) => state.data
  );
  const [selected, setSelected] = useState<Automation[]>(module.automations);
  const [header, setHeader] = useState<string>(module.header);
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
  }, [actions, instructions, search]);

  const addAction = (action: Action | Instruction) => {
    if (action.dataType) {
      setSelected([
        ...selected,
        { type: action.dataType, automationId: action.id },
      ]);
    }
  };

  const removeAction = (actionIndex: number) => {
    const newSelected = [...selected];
    newSelected.splice(actionIndex, 1);
    setSelected(newSelected);
  };

  const update = () => {
    dispatch(editModule({ ...module, header, automations: selected }));
  };

  return (
    <EditModalContent module={module} onSubmit={update} width="720px">
      <Stack spacing={2}>
        <FormControl>
          <FormLabel htmlFor="module-header">Name</FormLabel>
          <Input
            id="module-header"
            value={header}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeader(e.target.value)
            }
          />
        </FormControl>
        <Box>
          <Heading size="lg" mb={2}>
            Automations
          </Heading>
          <Flex>
            <Box flex={1} pr={2}>
              <Input
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                placeholder="Search actions..."
                mb={4}
              />
              <Scrollbars
                style={{
                  height: 400,
                  borderWidth: filteredActions.length > 0 ? 1 : 0,
                  borderRadius: 4,
                }}
              >
                <Box maxH={400}>
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
                          background:
                            colorMode === "light" ? "#efefef" : "#2D3748",
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
            <Box flex={1} pl={2}>
              <Heading size="xl" mb={2}>
                Selected
              </Heading>
              <List as="ol" styleType="decimal">
                {selected.map((automation, actionIndex) => (
                  <ListItem
                    key={`${automation.type}-${automation.automationId}`}
                    cursor="pointer"
                    onClick={() => removeAction(actionIndex)}
                  >
                    {automation.type === "action"
                      ? actions[automation.automationId].name
                      : instructions[automation.automationId].name}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </EditModalContent>
  );
};

export default hot(module)(AutomationsEdit);
