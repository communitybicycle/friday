import { Box, Flex, Grid, Heading, Select } from "@chakra-ui/core";
import { Card, CardTitle } from "components/card/Card";
import PageHeader from "components/page/PageHeader";
import moment from "moment";
import NoteSubMenu from "pages/notes/NoteSubMenu";
import React, { useMemo, useState } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers/store";

type SortOptions = "updatedAt" | "createdAt";

const NoteDashboard: React.FC = () => {
  const history = useHistory();
  const { notes } = useSelector((state: RootState) => state.data);
  const [sortBy, setSortBy] = useState<SortOptions>("updatedAt");

  const recentNotes = useMemo(() => {
    return Object.values(notes).sort(
      (a, b) => moment(b[sortBy]).valueOf() - moment(a[sortBy]).valueOf()
    );
  }, [sortBy]);

  return (
    <NoteSubMenu>
      <PageHeader id="notes" text="Notes Dashboard" isDisabled />
      <Flex justify="space-between">
        <Heading size="xl" mb={4} flex={1}>
          Latest Notes
        </Heading>
        <Box>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOptions)}
          >
            <option value="updatedAt">Updated At</option>
            <option value="createdAt">Created At</option>
          </Select>
        </Box>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {recentNotes.map((note) => (
          <Card
            key={note.id}
            onClick={() => history.push(`/notes/${note.id}`)}
            cursor="pointer"
          >
            <CardTitle isTruncated>{note.title}</CardTitle>
            Last updated: {moment(note.updatedAt).format("MMM DD, YYYY")}
          </Card>
        ))}
      </Grid>
    </NoteSubMenu>
  );
};

export default hot(module)(NoteDashboard);
