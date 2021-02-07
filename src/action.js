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

export const sendMessage = (message) => (dispatch, getState) => {
  const currentCode = getState().codeStorage[0].codeValue;
  const messageId = +new Date();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  dispatch({
    type: "SEND_MESSAGE",
    payload: { message, messageId },
  });
  const reqBody = JSON.stringify({
    code: `(${currentCode})('${message}')`,
  });

  let receivedMessage = {
    status: "loading", //'can be loading/received/failed'
    text: "",
  };

  fetch("https://shrouded-oasis-94153.herokuapp.com/", {
    method: "POST",
    headers: myHeaders,
    body: reqBody,
    redirect: "follow",
  })
    .then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then((text) => {
      receivedMessage.status = "received";
      receivedMessage.text = text;
    })
    .catch(() => {
      receivedMessage.status = "failed";
      receivedMessage.text = "";
    })
    .finally(() => {
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: { message: receivedMessage, messageId },
      });
    });
};
