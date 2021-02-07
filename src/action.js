export const selectTab = (tabIndex) => (dispatch) => {
  dispatch({
    type: "SELECT_TAB", // <- this should be const variable string, 
    payload: tabIndex,
  });
};

export const closeTab = (tabIndex) => (dispatch) => {
  dispatch({
    type: "CLOSE_TAB",
    payload: tabIndex,
  });
};
export const createTab = () => (dispatch) => {
  dispatch({
    type: "CREATE_TAB",
  });
};
export const updateCodeCurrentVersion = (newVersion) => (dispatch) => {
  dispatch({
    type: "UPDATE_CODE_CURRENT_VERSION",
    payload: newVersion,
  });
};
export const saveCode = (code) => (dispatch) => {
  dispatch({
    type: "SAVE_CODE",
    payload: code,
  });
};
