import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducer";

// default state
const defaultState = {
  selectedTab: 0,
  tabs: [
    {
      name: "index",
    },
  ],
  codeStorage: [
    {
      codeVersion: 0, // <- random string to compare and check if code is saved
      currentVersion: 0, // whenever new code is typed this will update, on save both codeVersion and currentVersion will be same
      codeValue: getDefaultCode(),
    },
  ],
  messages: [
    // {
    //   messageId: +new Date(),
    //   sent: {
    //     text: "marco",
    //   },
    //   reply: {
    //     status: "loading", // can be loading/received/failed
    //     text: "polo",
    //   },
    // },
  ],
};

// initialize store
const localStorageKey = "store";
const saveStoreToLocalStorage = (state) => {
  const storeAsString = JSON.stringify(state);
  localStorage.setItem(localStorageKey, storeAsString);
};
const loadStoreFromLocalStorage = () => {
  const storeAsString = localStorage.getItem(localStorageKey);
  if (storeAsString === null) return defaultState;
  return JSON.parse(storeAsString);
};
const persistedState = loadStoreFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
store.subscribe(() => saveStoreToLocalStorage(store.getState()));

export default store;
// export default function configureStore(initialState = defaultState) {
//   return createStore(rootReducer, initialState, applyMiddleware(thunk));
// }

// funcs
function getDefaultCode() {
  return `function name (param) {
    // start hacking :)
    // ctrl+s or cmd+s to save, otherwise you will loose your code :P 
    // try reloading after save
    // timestamp ${new Date()}
    return param === 'marco' ? 'polo' : param;
}`;
}

export const createTabNameData = (totalTabs) => {
  const versionCode = +new Date();
  const tabName = `file${totalTabs + 1}`;
  const tabData = {
    codeVersion: versionCode,
    currentVersion: versionCode,
    codeValue: getDefaultCode(),
  };
  return [tabName, tabData];
};

// selectors
export const getTabs = (state) => {
  const { tabs, selectedTab, codeStorage } = state;
  const isCodeSavedInTabs = codeStorage.map((codeStore) => {
    const { currentVersion, codeVersion } = codeStore;
    return currentVersion === codeVersion;
    // this will be arr of bool
  });
  return [tabs, selectedTab, isCodeSavedInTabs];
};
export const getCurrentCodeStorage = (state) => {
  const { selectedTab, codeStorage } = state;
  return codeStorage[selectedTab].codeValue;
};
export const getMessages = (state) => {
  const { messages } = state;
  return messages;
};
