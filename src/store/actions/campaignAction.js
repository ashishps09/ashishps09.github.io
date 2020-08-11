import { GET_CAMPAIGN_DATA, SET_CAMPAIGN_DATA } from "./types";
export const getCampaigns = () => {
  return {
    type: GET_CAMPAIGN_DATA
  };
};

export const setCampaigns = input => {
  return {
    type: SET_CAMPAIGN_DATA,
    payload: input
  };
};
