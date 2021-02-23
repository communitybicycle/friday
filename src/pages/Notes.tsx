import React from "react";
import { hot } from "react-hot-loader";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setNoteContent } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import Container from "components/layout/Container";
import PageHeader from "components/page/PageHeader";

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
    <Container>
      <PageHeader id="notes" text="Notes" />
      <ReactQuill theme="snow" value={content} onChange={handleChange} />
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
    </Container>
  );
};

export default hot(module)(Notes);
