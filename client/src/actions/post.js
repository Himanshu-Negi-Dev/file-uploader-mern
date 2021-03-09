import {
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_POST,
} from "../actions/type";
import axios from "axios";

//get  posts
export const getPost = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/file-uploader");
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//add post

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      const { image, name } = data;
      const res = await axios.post("/file-uploader", data);
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// update post

export const updatePost = (id, data) => {
  return async (dispatch) => {
    try {
      const { image, name } = data;
      const res = await axios.put(`/file-uploader/${id}`, {
        image: image,
        name: name,
      });
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/file-uploader/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setCurrent = (post) => {
  return {
    type: SET_CURRENT,
    payload: post,
  };
};
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};
