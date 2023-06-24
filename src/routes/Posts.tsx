import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import CreatePostModal from "../modals/CreatePostModal";
import { AppDispatch, RootState } from "../redux/store/configureStore";
import { PostType, deletePost, getPosts } from "../redux/reducers/postSlice";
import Post from "../components/Post";
import EditPostModal from "../modals/EditPostModal";
import ConfirmationModal from "../modals/ConfirmationModal";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<PostType | null>(null);
  const state = useSelector((state: RootState) => state.posts);

  React.useEffect(() => {
    (async () => {
      await dispatch(getPosts());
    })();
  }, [dispatch]);

  const onEditPost = (post: PostType) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  const onDeletePost = (post: PostType) => {
    setSelectedPost(post);
    setShowConfirmModal(true);
  };

  const confirmDeletePost = async () => {
    dispatch(deletePost(selectedPost?.id!)).then(async () => {
      await dispatch(getPosts());
      setShowConfirmModal(false);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, textAlign: "left" }}>Posts</div>
        <div>
          <Button
            label="New Post"
            onClick={() => setShowModal(true)}
            className="button"
          />
        </div>
      </div>
      <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
        {state.posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            onEditPost={onEditPost}
            onDeletePost={onDeletePost}
          />
        ))}
      </div>
      <CreatePostModal show={showModal} onClose={() => setShowModal(false)} />
      <EditPostModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        post={selectedPost}
      />
      <ConfirmationModal
        show={showConfirmModal}
        message="Are you sure you want to delete this post?"
        onClose={() => setShowConfirmModal(false)}
        confirmDelete={confirmDeletePost}
      />
    </div>
  );
};

export default Posts;
