import * as types from "./actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
  singleUserInfo: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
    case types.CREATE_USER_START:
    case types.DELETE_USER_START:
    case types.UPDATE_USER_START:
    case types.LOAD_SINGLE_USER_START:
    case types.LOAD_SEARCH_START:
    case types.FILTER_USER_START:
      return {
        ...state,
        loading: true,
      };

    case types.LOAD_USERS_SUCCESS:
    case types.LOAD_SEARCH_SUCCESS:
    case types.FILTER_USER_SUCCESS:
    case types.SORT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      const updatedUsers = state.users.filter((e) => e.id !== action.payload);
      return {
        ...state,
        loading: false,
        users: updatedUsers,
      };
    case types.LOAD_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleUserInfo: action.payload,
      };

    case types.LOAD_USERS_ERROR:
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.LOAD_SINGLE_USER_ERROR:
    case types.LOAD_SEARCH_ERROR:
    case types.FILTER_USER_ERROR:
    case types.SORT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
