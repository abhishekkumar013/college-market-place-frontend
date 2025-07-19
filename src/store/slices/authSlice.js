import { createSlice } from "@reduxjs/toolkit";
import { server } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLogin: false,
  user: null,
  message: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    loginFailed(state) {
      state.isLogin = false;
      state.user = null;
    },
    logoutSuccess(state) {
      state.isLogin = false;
      state.user = null;
    },
    updateProfileSuccess(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  updateProfileSuccess,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;

export const checkLoginStatus = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`${server}/user/login/success`, {
      withCredentials: true,
    });

    if (data && data.user) {
      dispatch(loginSuccess(data.user));
    }
  } catch (error) {
    dispatch(loginFailed());
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkUserAuth = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`${server}/user/isauth`, {
      withCredentials: true,
    });

    console.log("CA", data);

    if (data) {
      dispatch(loginSuccess(data.data));
    }
  } catch (error) {
    dispatch(loginFailed());
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch(logoutSuccess());

    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Error logging out");
    dispatch(logoutSuccess());
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    // const { token } = getState().auth
    const { data } = await axios.put(
      `${server}/user/update-profile`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      toast.success(data.message);
      dispatch(updateProfileSuccess(data.data));
      // dispatch(loginSuccess(data.user))
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};
