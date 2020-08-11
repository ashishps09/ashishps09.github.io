import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { saga } from "./saga";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare];

const saveToSessionStorage = state => {
  try {
    // let filteredState = [];
    // for (let key in state) {
    //   if (key == "campaigns") {
    //     filteredState.push(state[key]);
    //   }
    // }
    // const serializedState = JSON.stringify(filteredState);
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadFromSessionStorage = state => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) return {};
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return {};
  }
};

const persistedState = loadFromSessionStorage();

const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => saveToSessionStorage(store.getState()));

sagaMiddleWare.run(saga);

export default store;
