import update from "immutability-helper";
import { defaultCode, createTabNameData } from "./store";

const reducer = (state, action) => {
  const { payload } = action;
  const currentTab = state.selectedTab;
  let newData;

  switch (action.type) {
    case "SELECT_TAB":
      newData = update(state, {
        selectedTab: { $set: payload },
      });
      return newData;
    case "CLOSE_TAB":
      newData = update(state, {
        tabs: { $splice: [[payload, 1]] },
        codeStorage: { $splice: [[payload, 1]] },
        selectedTab: {
          $set: 0,
        },
      });
      return newData;
    case "CREATE_TAB":
      const tabsLen = state.tabs.length;
      const [tabName, tabData] = createTabNameData(tabsLen);
      newData = update(state, {
        tabs: { $push: [{ name: tabName }] },
        codeStorage: {
          $push: [{ ...tabData }],
        },
        selectedTab: { $set: tabsLen },
      });
      return newData;
    case "UPDATE_CODE_CURRENT_VERSION":
      newData = update(state, {
        codeStorage: {
          [currentTab]: {
            currentVersion: {
              $set: payload,
            },
          },
        },
      });
      return newData;
    case "SAVE_CODE":
      newData = update(state, {
        codeStorage: {
          [currentTab]: {
            currentVersion: {
              $set: 0,
            },
            codeVersion: {
              $set: 0,
            },
            codeValue: {
              $set: payload,
            },
          },
        },
      });
      return newData;
    default:
      return state;
  }
};

export default reducer;
