import axios from "axios";
import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
} from "../constants/notesContants";

export const listNotes = () => async (dispach, getState) => {
  const API_URL = "/api/notes";

  try {
    dispach({ type: NOTE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(API_URL, config);
    if (data) {
      dispach({
        type: NOTE_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message = error.response?.data?.message
      ? error.response?.data?.message
      : error.message;
    dispach({
      type: NOTE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNote =
  (title, content, category) => async (dispach, getState) => {
    const API_URL = "/api/notes";

    try {
      dispach({
        type: NOTE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        API_URL + "/create",
        { title, content, category },
        config
      );

      if (data) {
        dispach({
          type: NOTE_CREATE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message
        ? error.response?.data?.message
        : error.message;
      dispach({
        type: NOTE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateNote =
  (id, title, content, category) => async (dispatch, getState) => {
    const API_URL = "/api/notes";

    try {
      dispatch({ type: NOTE_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        API_URL + `/${id}`,
        { title, content, category },
        config
      );

      if (data) {
        dispatch({
          type: NOTE_UPDATE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message
        ? error.response?.data?.message
        : error.message;
      dispatch({
        type: NOTE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNote = (id) => async (dispatch, getState) => {
  const API_URL = "/api/notes";

  try {
    dispatch({ type: NOTE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(API_URL + `/${id}`, config);

    if (data) {
      dispatch({
        type: NOTE_UPDATE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message = error.response?.data?.message
      ? error.response?.data?.message
      : error.message;
    dispatch({
      type: NOTE_UPDATE_FAIL,
      payload: message,
    });
  }
};
