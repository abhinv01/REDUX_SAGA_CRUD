import * as types from "./actionTypes";

export const loadUsersStart = () => ({
  type: types.LOAD_USERS_START,
});
export const loadUsersSuccess = (users) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: users,
});
export const loadUsersError = (error) => ({
  type: types.LOAD_USERS_ERROR,
  payload: error,
});

export const createUsersStart = (user) => ({
  type: types.CREATE_USER_START,
  payload: user,
});
export const createUsersSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});
export const createUsersError = (error) => ({
  type: types.CREATE_USER_ERROR,
  payload: error,
});

export const deleteUsersStart = (userId) => ({
  type: types.DELETE_USER_START,
  payload: userId,
});
export const deleteUsersSuccess = (userId) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: userId,
});
export const deleteUsersError = (error) => ({
  type: types.DELETE_USER_ERROR,
  payload: error,
});

export const updateUsersStart = (userId, userInfo) => ({
  type: types.UPDATE_USER_START,
  payload: { userId, userInfo },
});
export const updateUsersSuccess = (userId) => ({
  type: types.UPDATE_USER_SUCCESS,
  payload: userId,
});
export const updateUsersError = (error) => ({
  type: types.UPDATE_USER_ERROR,
  payload: error,
});

export const loadSingleUserStart = (userId) => ({
  type: types.LOAD_SINGLE_USER_START,
  payload: userId,
});
export const loadSingleUserSuccess = (userInfo) => ({
  type: types.LOAD_SINGLE_USER_SUCCESS,
  payload: userInfo,
});
export const loadSingleUserError = (error) => ({
  type: types.LOAD_SINGLE_USER_ERROR,
  payload: error,
});

export const searchUserStart = (query) => ({
  type: types.LOAD_SEARCH_START,
  payload: query,
});
export const searchUserSuccess = (users) => ({
  type: types.LOAD_SEARCH_SUCCESS,
  payload: users,
});
export const searchUserError = (error) => ({
  type: types.LOAD_SEARCH_ERROR,
  payload: error,
});

export const filterUserStart = (value) => ({
  type: types.FILTER_USER_START,
  payload: value,
});
export const filterUserSuccess = (users) => ({
  type: types.FILTER_USER_SUCCESS,
  payload: users,
});
export const filterUserError = (error) => ({
  type: types.FILTER_USER_ERROR,
  payload: error,
});

export const sortUserStart = (value) => ({
  type: types.SORT_USER_START,
  payload: value,
});
export const sortUserSuccess = (users) => ({
  type: types.SORT_USER_SUCCESS,
  payload: users,
});
export const sortUserError = (error) => ({
  type: types.SORT_USER_ERROR,
  payload: error,
});
