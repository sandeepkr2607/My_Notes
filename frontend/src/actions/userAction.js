import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  const API_URL = "/api/users";

  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      API_URL + "/login",
      {
        email,
        password,
      },
      config
    );

    // console.log(response.data)
    if (response?.data) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response?.data });
      localStorage.setItem("userInfo", JSON.stringify(response?.data));
    }
    // setIsLoading(false)
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message
        ? error.response?.data?.message
        : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, pic) => async (dispatch) => {
  const API_URL = "/api/users";

  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      API_URL,
      {
        name,
        email,
        password,
        pic,
      },
      config
    );

    if (response?.data) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response?.data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response?.data });

      localStorage.setItem("userInfo", JSON.stringify(response?.data));
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message
        ? error.response?.data?.message
        : error.message,
    });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  const API_URL = "/api/users";

  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(API_URL + "/profile", user, config);

    if (data) {
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
