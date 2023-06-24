import React from "react";
import { Form, Formik, FormikProps } from "formik";
import Modal, { ModalProps } from "./Modal";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { CreatePostSchema } from "../validations/posts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/configureStore";
import { createPost } from "../redux/reducers/postSlice";

type Values = {
  title: string;
  author: string;
  body: string;
};

const CreatePostModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: Values) => {
    dispatch(createPost(values)).then(() => {
      onClose();
    });
  };

  return (
    <Modal title="New Post" show={show} onClose={onClose}>
      <Formik
        initialValues={{
          title: "",
          author: "",
          body: "",
        }}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        validationSchema={CreatePostSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }: FormikProps<Values>) => (
          <Form>
            <InputField
              name="title"
              label="Title"
              placeholder="Title"
              required
            />
            <InputField
              name="author"
              label="Author"
              placeholder="Author"
              required
            />
            <TextArea
              name="body"
              rows={5}
              label="Description"
              placeholder="Description"
              required
            />
            <Button
              type="submit"
              label="Save Post"
              className="button"
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreatePostModal;
