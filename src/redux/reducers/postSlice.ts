import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteApi, getApi, postApi, putApi } from "../../api";

export type PostType = {
  id?: number;
  title: string;
  body: string;
  author: string;
};

interface PostState {
  posts: PostType[];
  post: PostType | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: any;
}

const initialState = {
  posts: [],
  post: null,
  loading: "idle",
  error: null,
} as PostState;

const namespace = "posts";

export const createPost = createAsyncThunk<PostType, PostType>(
  `${namespace}/createPost`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await postApi({
        url: "posts",
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPost = createAsyncThunk<PostType, number>(
  `${namespace}/getPost`,
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getApi({
        url: `posts/${postId}`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPosts = createAsyncThunk<PostType[]>(
  `${namespace}/getPosts`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getApi({
        url: "posts",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk<PostType, PostType>(
  `${namespace}/updatePost`,
  async (data, { rejectWithValue }) => {
    const { id, ...rest } = data;
    try {
      const response = await putApi({
        url: `posts/${id}`,
        data: rest,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk<PostType, number>(
  `${namespace}/deletePost`,
  async (postId, { rejectWithValue }) => {
    try {
      const response = await deleteApi({
        url: `posts/${postId}`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload);
        state.loading = "fulfilled";
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.loading = "rejected";
        state.error = payload;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.post = payload;
        state.loading = "fulfilled";
      })
      .addCase(getPost.rejected, (state, { payload }) => {
        state.loading = "rejected";
        state.error = payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loading = "fulfilled";
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.loading = "rejected";
        state.error = payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.map((post) => {
          if (post.id === payload.id) {
            return payload;
          }
          return post;
        });
        state.loading = "fulfilled";
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.loading = "rejected";
        state.error = payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.filter((post) => post.id !== payload.id);
        state.loading = "fulfilled";
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = "rejected";
        state.error = payload;
      });
  },
});

export default postSlice.reducer;
