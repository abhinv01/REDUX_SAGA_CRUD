import * as types from "./actionTypes";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import {
  createUsersError,
  createUsersSuccess,
  deleteUsersError,
  deleteUsersSuccess,
  filterUserError,
  filterUserSuccess,
  loadSingleUserError,
  loadSingleUserSuccess,
  loadUsersError,
  loadUsersSuccess,
  searchUserError,
  searchUserSuccess,
  sortUserError,
  sortUserSuccess,
  updateUsersError,
  updateUsersSuccess,
} from "./actions";
import {
  createUserApi,
  deleteUserApi,
  filterUserApi,
  loadSingleUserApi,
  loadUsersApi,
  SearchUserApi,
  sortUserApi,
  updateUserApi,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    // console.log("5455454", response);

    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    // console.log("5455454", error);
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Something went wrong. Please try again later.";
    yield put(loadUsersError(errorMessage));
  }
}
function* onCreateUserStartAsync({ payload }) {
  // console.log("payload in create saga", payload);
  try {
    const response = yield call(createUserApi, payload);
    // console.log("5455454", response);

    if (response.status === 201) {
      yield put(createUsersSuccess(response.data));
    }
  } catch (error) {
    // console.log("5455454", error);
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Something went wrong. Please try again later.";
    yield put(createUsersError(errorMessage));
  }
}

function* onDeleteUserStartAsync(payload) {
  // console.log("payload in delete saga", payload);
  try {
    const response = yield call(deleteUserApi, payload);
    // console.log("5455454", response);

    if (response.status === 200) {
      yield put(deleteUsersSuccess(payload));
    }
  } catch (error) {
    // console.log("5455454", error);
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Something went wrong. Please try again later.";
    yield put(deleteUsersError(errorMessage));
  }
}

function* onUpdateUserStartAsync({ payload }) {
  // console.log("payload in update saga", payload);
  const { userId, userInfo } = payload;
  try {
    const response = yield call(updateUserApi, userId, userInfo);
    // console.log("5455454", response);

    if (response.status === 200) {
      yield put(updateUsersSuccess(userId));
    }
  } catch (error) {
    // console.log("5455454", error);
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Something went wrong. Please try again later.";
    yield put(updateUsersError(errorMessage));
  }
}
function* onLoadSingleUserStartAsync({ payload: userId }) {
  // yield console.log("payload in load single saga", userId);
  try {
    const response = yield call(loadSingleUserApi, userId);
    // console.log("5455454", response);

    if (response.status === 200) {
      yield put(loadSingleUserSuccess(response.data));
    }
  } catch (error) {
    // console.log("5455454", error);
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Something went wrong. Please try again later.";
    yield put(loadSingleUserError(errorMessage));
  }
}

function* onSearchUserStartAsync({ payload: query }) {
  try {
    const response = yield call(SearchUserApi, query);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Server error";
    yield put(searchUserError(errorMessage));
  }
}

function* onFilterUserStartAsync({ payload: value }) {
  try {
    const response = yield call(filterUserApi, value);
    if (response.status === 200) {
      yield put(filterUserSuccess(response.data));
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Server error";
    yield put(filterUserError(errorMessage));
  }
}

function* onSortUserStartAsync({ payload: value }) {
  try {
    const response = yield call(sortUserApi, value);
    if (response.status === 200) {
      yield put(sortUserSuccess(response.data));
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Server error";
    yield put(sortUserError(errorMessage));
  }
}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}
export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    // console.log("saga onDeleteUser", userId);
    yield call(onDeleteUserStartAsync, userId);
  }
}

export function* onSingleUser() {
  yield takeLatest(types.LOAD_SINGLE_USER_START, onLoadSingleUserStartAsync);
}

export function* onSearchUser() {
  yield takeLatest(types.LOAD_SEARCH_START, onSearchUserStartAsync);
}

export function* onFilterUser() {
  yield takeLatest(types.FILTER_USER_START, onFilterUserStartAsync);
}

export function* onSortUser() {
  yield takeLatest(types.SORT_USER_START, onSortUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onSingleUser),
  fork(onSearchUser),
  fork(onFilterUser),
  fork(onSortUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
