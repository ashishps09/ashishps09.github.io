import { SET_LOCALE_LANG_ASYNC } from "../actions/types";

const initialState = {
  val: "en"
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE_LANG_ASYNC:
      return { val: action.payload };
    default:
      return { ...state };
  }
};

export default languageReducer;
