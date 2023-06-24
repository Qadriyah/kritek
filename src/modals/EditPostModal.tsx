import React from "react";
import Modal, { ModalProps } from "./Modal";
import { PostType, updatePost } from "../redux/reducers/postSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/configureStore";
import { Form, Formik, FormikProps } from "formik";
import { UpdatePostSchema } from "../validations/posts";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

type Values = {
  title: string;
  author: string;
  body: string;
};

type IProps = ModalProps & {
  post?: PostType | null;
};

const EditPostModal: React.FC<IProps> = ({ show, post, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: Values) => {
    dispatch(
      updatePost({
        ...values,
        id: post?.id,
      })
    ).then(() => {
      onClose();
    });
  };

  return (
    <Modal title="Edit Post" show={show} onClose={onClose}>
      <Formik
        initialValues={{
          title: post?.title ?? "",
          author: post?.author ?? "",
          body: post?.body ?? "",
        }}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        validationSchema={UpdatePostSchema}
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
              label="Update Post"
              className="button"
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditPostModal;
