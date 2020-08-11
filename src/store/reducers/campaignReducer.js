import {
  GET_CAMPAIGN_DATA_ASYNC,
  SET_CAMPAIGN_DATA_ASYNC
} from "../actions/types";

const initialState = {
  data: []
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPAIGN_DATA_ASYNC:
      return { ...action.payload };
    case SET_CAMPAIGN_DATA_ASYNC:
      const newData = state.data.map(oldData => {
        if (oldData.name === action.payload.name) {
          return action.payload;
        } else {
          return oldData;
        }
      });
      return { data: newData };
    default:
      return { ...state };
  }
};

export default campaignReducer;
