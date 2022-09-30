import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import iconNames from "./icons";
import "./style.css";

export default function BootstrapIconPicker({ onChange, buttonClass }) {
  const [icon, setIcon] = useState("alarm");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(icon);
  const [allIcons, setAllIcons] = useState(iconNames);

  const searchIcons = (e) => {
    const value = e.target.value;
    if (value == "") {
      setAllIcons(iconNames);
    } else {
      let found = [];
      iconNames.forEach((icon_) => {
        if (icon_.includes(value)) {
          found.push(icon_);
        }
      });
      setAllIcons(found);
    }
  };

  const close = () => {
    setAllIcons(iconNames);
    setIsOpen(false);
  };

  const toggle = () => {
    setAllIcons(iconNames);
    setIsOpen(!isOpen);
  };

  return (
    <div className="icon_picker">
      <button
        className={buttonClass ? buttonClass : "icon_option"}
        onClick={toggle}
      >
        <i className={`bi bi-${icon}`}></i>
      </button>
      {isOpen && (
        <div
          className="picker_dialog"
          onMouseLeave={() => {
            setCurrentIcon(icon);
          }}
        >
          <div className="icon_container">
            {allIcons.map((iconName, idx) => (
              <div
                onClick={() => {
                  close();
                  setIcon(iconName);
                  onChange(iconName);
                }}
                onMouseEnter={() => {
                  setCurrentIcon(iconName);
                }}
                className="icon_option"
                key={idx}
              >
                <i className={`bi bi-${iconName}`}></i>
              </div>
            ))}
          </div>
          <div style={{ margin: 5 }}>
            <input
              type="search"
              className="search_field"
              placeholder={currentIcon}
              onChange={searchIcons}
            />
          </div>
        </div>
      )}
    </div>
  );
}
