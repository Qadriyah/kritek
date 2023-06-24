import React from "react";
import { PostType } from "../redux/reducers/postSlice";
import Button from "./Button";

type IProps = {
  post: PostType;
  onEditPost: (post: PostType) => void;
  onDeletePost: (post: PostType) => void;
};

const Post: React.FC<IProps> = ({ post, onEditPost, onDeletePost }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-icon">{post.title.charAt(0).toUpperCase()}</div>
        <div style={{ flex: 1 }}>
          <div className="post-title">{post.title}</div>
          <div className="author">{post.author}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            label="Edit"
            className="button"
            onClick={() => onEditPost(post)}
          />
          <Button
            label="Del"
            className="button-danger"
            onClick={() => onDeletePost(post)}
          />
        </div>
      </div>
      <div className="post-body">{post.body}</div>
    </div>
  );
};

export default Post;
