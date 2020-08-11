import { getCampaignWatcher, setCampaignWatcher } from "./campaignSaga";
import { setLangWatcher } from "./languageSaga";
import { all } from "redux-saga/effects";

export function* saga() {
  yield all([getCampaignWatcher(), setCampaignWatcher(), setLangWatcher()]);
  // yield all([fork(getCampaignWatcher, setCampaignWatcher)]);
}
