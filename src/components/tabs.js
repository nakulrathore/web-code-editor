import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTabs } from "../store";
import {
  selectTab as updateSelectedTab,
  closeTab as closeSelectedTab,
  createTab as createNewTab,
} from "../action";

const Tabs = () => {
  const [tabsData, selectedTab, isCodeSavedInTabs] = useSelector(getTabs);
  const actionDispatcher = useDispatch();

  const selectTab = (tabIndex) => {
    actionDispatcher(updateSelectedTab(tabIndex));
  };
  const closeTab = (tabIndex) => {
    actionDispatcher(closeSelectedTab(tabIndex));
  };
  const createTab = () => {
    actionDispatcher(createNewTab());
  };
  return (
    <section className="tabs-wrapper">
      <ul>
        {tabsData.map((tabData, index) => {
          const { name } = tabData;
          return (
            <Tab
              name={name}
              key={index}
              index={index}
              selectedTab={selectedTab}
              selectTab={selectTab}
              closeTab={closeTab}
              isCodeSaved={isCodeSavedInTabs[index]}
            />
          );
        })}
      </ul>
      <button onClick={createTab} className="new-tab" title="new tab">
        +
      </button>
    </section>
  );
};

const Tab = ({
  name,
  index,
  selectedTab,
  selectTab,
  closeTab,
  isCodeSaved,
}) => {
  const handleTabSelect = () => {
    if (selectedTab !== index) {
      selectTab(index);
    }
  };
  const handleCloseTab = () => {
    closeTab(index);
  };
  return (
    <li className={index === selectedTab ? "selected" : "not-selected"}>
      <div className="tab-name" title="select tab" onClick={handleTabSelect}>
        {!isCodeSaved ? <sup>*</sup> : null}
        {name}.js
      </div>
      {index !== 0 ? (
        <button className="close" title="close tab" onClick={handleCloseTab}>
          X
        </button>
      ) : null}
    </li>
  );
};

export default Tabs;
