import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_POST,
  REMOVE_POST,
  UPDATE_POSTS,
  ADD_POST,
  ADD_FAVORITE,
  UPDATE_FAVORITES,
  REMOVE_FAVORITE,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  // console.log('reducer action', action);
  switch (action.type) {
    case SET_CURRENT_POST:
      return { ...state, 
        currentPost: action.post,
        loading: false
      };

    case UPDATE_POSTS :
      return {
        ...state, 
        posts: [...action.posts],
        loading: false
      };

    case ADD_POST :
      return {
        ...state, 
        posts: [action.post, ...state.posts],
        loading: false
      };

    case REMOVE_POST :
      return { 
        ...state, 
        posts: state.posts.filter(post => post._id !== action.id)
      };

    case ADD_FAVORITE :
      return {
        ...state, 
        favorites: [action.post, ...state.favorites],
        loading: false
      };

    case REMOVE_FAVORITE :
      return {
        ...state, 
        favorites: state.favorites.filter(fav => fav._id !== action._id),
      };

    case UPDATE_FAVORITES :
      return {
        ...state,
        favorites: [...state.favorites],
        loading: false
      };
    
    case LOADING :
      return { ...state, loading: true};
    
  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    currentPost: {
      id: 0,
      title: "",
      body: "",
      author: ""
    },
    favorites: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props}/>;
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };
