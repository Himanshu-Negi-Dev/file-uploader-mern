import { ADD_POST, CLEAR_CURRENT, DELETE_POST, GET_POST, SET_CURRENT, UPDATE_POST } from "../actions/type";

const initialState = {
   posts: [],
   current: null,
};

export const postReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case GET_POST:
         return {
            ...state,
            posts: payload,
         };
      case ADD_POST:
         return {
            ...state,
            posts: [...state.posts, payload],
         };

      case UPDATE_POST:
         return {
            ...state,
            posts: state.posts.map((post) => (post._id === state.current.id ? payload : post)),
         };

      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter((post) => post._id !== payload),
         };

      case SET_CURRENT:
         return {
            ...state,
            current: payload,
         };
      case CLEAR_CURRENT:
         return {
            ...state,
            current: null,
         };

      default:
         return state;
   }
};
