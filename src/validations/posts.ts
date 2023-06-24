import * as Yup from "yup";

export const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  body: Yup.string().required("Description is required"),
});

export const UpdatePostSchema = Yup.object().shape({
  title: Yup.string(),
  author: Yup.string(),
  body: Yup.string(),
});
