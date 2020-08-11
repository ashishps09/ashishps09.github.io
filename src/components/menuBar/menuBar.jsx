import React from "react";
import "./menuBar.scss";
function MenuBar(props) {
  const getMenuBar = () => {
    return props.menuData.map((m, index) => {
      let menuClass;
      if (m.selected) {
        menuClass = "menu-selected";
      } else {
        menuClass = "";
      }
      return (
        <span
          onClick={() => props.handleMenuChange(m.name)}
          className={`menu px-3 py-2 ${menuClass}`}
          key={`menu${index}`}
        >
          {m.name}
        </span>
      );
    });
  };

  return (
    <React.Fragment>
      <main className="pt-3">
        <div className="menu-container d-flex text-center">{getMenuBar()}</div>
      </main>
    </React.Fragment>
  );
}

export default MenuBar;
