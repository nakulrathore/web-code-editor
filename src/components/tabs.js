import React from "react";
import { useSelector, useDispatch } from "react-redux";

// styles
import "../styles/tabs.scss";

// func imports
import { getTabs } from "../store";

// actions
import {
  selectTab as updateSelectedTab,
  closeTab as closeSelectedTab,
  createTab as createNewTab,
} from "../action";

const Tabs = () => {
  const [tabsData, selectedTab, isCodeSavedInTabs] = useSelector(getTabs);
  const actionDispatcher = useDispatch();

  const tabOperations = {
    selectTab: (tabIndex) => {
      actionDispatcher(updateSelectedTab(tabIndex));
    },
    closeTab: (tabIndex) => {
      actionDispatcher(closeSelectedTab(tabIndex));
    },
    createTab: () => {
      actionDispatcher(createNewTab());
    },
  };
  return (
    <section className="tabs-wrapper">
      <ul>
        {tabsData.map((tabData, index) => {
          const { name } = tabData;
          return (
            <Tab
              key={index}
              name={name}
              index={index}
              selectedTab={selectedTab}
              tabOperations={tabOperations}
              isCodeSaved={isCodeSavedInTabs[index]}
            />
          );
        })}
      </ul>
      <button
        onClick={tabOperations.createTab}
        className="new-tab"
        title="new tab"
      >
        ＋
      </button>
    </section>
  );
};

const Tab = ({ name, index, selectedTab, tabOperations, isCodeSaved }) => {
  const { selectTab, closeTab } = tabOperations;
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
