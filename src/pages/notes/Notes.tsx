import PageHeader from "components/page/PageHeader";
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
  const { content } = useSelector(
    (state: RootState) => state.data.pages.notes[id]
  );

  const handleChange = (newContent: string) => {
    dispatch(setNoteContent({ id, content: newContent }));
  };

  return (
    <NoteSubMenu>
      <PageHeader id={id} type="notes" />
      <ReactQuill
        theme="bubble"
        value={content}
        onChange={handleChange}
        placeholder="Input goes here"

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
      {/*<Editor*/}
      {/*  initialValue="What a beautiful world!"*/}
      {/*  apiKey={process.env.REACT_APP_TINY_API_KEY}*/}
      {/*  init={{*/}
      {/*    width: "100%",*/}
      {/*    inline: true,*/}
      {/*    height: 600,*/}
      {/*    menubar: false,*/}
      {/*    plugins: [*/}
      {/*      "advlist autolink lists link image charmap print preview anchor",*/}
      {/*      "searchreplace visualblocks code fullscreen",*/}
      {/*      "insertdatetime media table paste code help wordcount",*/}
      {/*    ],*/}
      {/*    toolbar:*/}
      {/*      "undo redo | formatselect | bold italic backcolor | \*/}
      {/*    alignleft aligncenter alignright alignjustify | \*/}
      {/*    bullist numlist outdent indent | removeformat | help",*/}
      {/*  }}*/}
      {/*/>*/}
    </NoteSubMenu>
  );
};

export default hot(module)(Notes);
