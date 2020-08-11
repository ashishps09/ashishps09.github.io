import { takeLatest, put } from "redux-saga/effects";
import {
  GET_CAMPAIGN_DATA,
  GET_CAMPAIGN_DATA_ASYNC,
  SET_CAMPAIGN_DATA,
  SET_CAMPAIGN_DATA_ASYNC
} from "../actions/types";
import { campaignsData } from "../../assets/mockData/campaignsData";

function* getCampaignWorker(action) {
  // Start : To show like DB, if in session than will render that data otherwise mockData or API CALL
  const serializedState = sessionStorage.getItem("state");
  const state = JSON.parse(serializedState);
  let campaigns;
  const campData = state.campaigns;
  if (campData && campData.data && campData.data.length > 0) {
    campaigns = campData;
  } else {
    campaigns = campaignsData;
  }
  yield put({ type: GET_CAMPAIGN_DATA_ASYNC, payload: campaigns });
}

export function* getCampaignWatcher() {
  yield takeLatest(GET_CAMPAIGN_DATA, getCampaignWorker);
}

function* setCampaignWorker(action) {
  yield put({ type: SET_CAMPAIGN_DATA_ASYNC, payload: action.payload });
}

export function* setCampaignWatcher() {
  yield takeLatest(SET_CAMPAIGN_DATA, setCampaignWorker);
}
