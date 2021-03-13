import { Text } from "@chakra-ui/core";
import PageHeader from "components/page/PageHeader";
import moment from "moment";
import NoteSubMenu from "pages/notes/NoteSubMenu";
import React from "react";
import { hot } from "react-hot-loader";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setNoteContent } from "reducers/dataReducer";
import { RootState } from "reducers/store";

const Notes: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const note = useSelector((state: RootState) => state.data.notes[id]);

  const { content, updatedAt } = note;

  const handleChange = (newContent: string) => {
    dispatch(setNoteContent({ id, content: newContent }));
  };

  return (
    <NoteSubMenu>
      <PageHeader id={id} type="notes">
        <Text fontSize="sm" color="gray.500">
          Last updated: {moment(updatedAt).format("MMM, DD, YYYY - h:mm:ss a")}
        </Text>
      </PageHeader>
      <ReactQuill
        theme="bubble"
        value={content}
        onChange={handleChange}
        placeholder="Input goes here"
        style={{ paddingBottom: "50px" }}

        // modules={{
        //   toolbar: [
        //     [{ header: "1" }, { header: "2" }, { font: [] }],
        //     [{ size: [] }],
        //     ["bold", "italic", "underline", "strike", "blockquote"],
        //     [
        //       { list: "ordered" },
        //       { list: "bullet" },
        //       { indent: "-1" },
        //       { indent: "+1" },
        //     ],
        //     ["link", "image", "video"],
        //     [{ color: [] }, { background: [] }],
        //     ["clean"],
        //   ],
        //   clipboard: {
        //     // toggle to add extra line breaks when pasting HTML:
        //     matchVisual: false,
        //   },
        // }}
        // bounds=".app"
        // formats={[
        //   "header",
        //   "font",
        //   "size",
        //   "bold",
        //   "italic",
        //   "underline",
        //   "strike",
        //   "blockquote",
        //   "list",
        //   "bullet",
        //   "indent",
        //   "link",
        //   "image",
        //   "video",
        //   "color",
        //   "background",
        // ]}
      />
    </NoteSubMenu>
  );
};

export default hot(module)(Notes);
