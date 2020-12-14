import React, {FunctionComponent} from "react";
import Container from "../components/Container";
import {Editor} from "@tinymce/tinymce-react";
import PageHeader from "../components/PageHeader";

const Notes: FunctionComponent = () => {
  console.log(process.env.REACT_APP_TINY_API_KEY);
  return (
    <Container>
      <PageHeader id="notes" text="Notes" />
      <Editor
        initialValue="What a beautiful world!"
        apiKey=""
        init={{
          width: "100%",
          inline: true,
          height: 600,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
        }}
      />
    </Container>
  );
};

export default Notes;
