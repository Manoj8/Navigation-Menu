import React, { Component } from "react";
import data from "../data.json";
import { toast } from "react-toast";
import { AiFillCaretRight, AiFillCaretDown, AiFillDelete } from "react-icons/ai";
import "./menu.css";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      data,
      parentMenu: 1,
      newCategory: "",
      activeList: null,
    };
    this.navRef = React.createRef();
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  addNewCategory = () => {
    const { data, parentMenu, newCategory } = this.state;
    let menuData = data[parentMenu - 1];
    menuData["subMenu"].push({
      name: newCategory,
    });
    if (menuData.hasSubMenu === false) menuData.hasSubMenu = true;
    data[parentMenu - 1] = menuData;
    this.setState({ data, newCategory: "" }, () => {
      toast.success("Successfully added the data");
    });
  };

  deleteMenu = (menuIndex, subIndex) => {
    let { data } = this.state;
    data[menuIndex]?.["subMenu"]?.splice(subIndex, 1);
    if (data[menuIndex]?.["subMenu"].length === 0) data[menuIndex]["hasSubMenu"] = false;
    this.setState({ data }, () => {
      toast.success("Successfully deleted the data");
    });
  };

  render() {
    const { data, parentMenu, newCategory, activeList } = this.state;
    return (
      <div className="menu-categories">
        <div className="nav-menu">
          {data.map((data, menuIndex) => {
            const showList = activeList === menuIndex;
            return (
              <div key={data.name + menuIndex} tabIndex="1" className="menu-list" onBlur={() => this.setState({ activeList: null })}>
                <li
                  ref={this.navRef}
                  className={`${showList ? "active-class" : ""}`}
                  onClick={(ev) => {
                    if (showList) menuIndex = null;
                    this.handleChange("activeList", menuIndex);
                  }}
                >
                  {data.name}
                  {data.hasSubMenu && <span className="nav-icon">{activeList === menuIndex ? <AiFillCaretRight /> : <AiFillCaretDown />}</span>}
                </li>
                {data.hasSubMenu && showList && (
                  <div className="sub-menu">
                    {data["subMenu"]?.map((data, subIndex) => {
                      return (
                        <p className="sub-menu-name" key={data.name + subIndex}>
                          {data.name}
                          <span className="delete-menu">
                            <AiFillDelete onClick={() => this.deleteMenu(menuIndex, subIndex)} />
                          </span>
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="category-form">
          <div className="form parent-category">
            <p>Parent Category </p>
            <select className="input-field" name="parentMenu" value={parentMenu.menuNumber} onChange={(ev) => this.handleChange("parentMenu", ev.target.value)}>
              {data.map((data, index) => {
                return (
                  <option key={data.menuNumber} value={data.menuNumber}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form new-category">
            <p>Enter New Category</p>
            <input type="text" className="input-field" name="newCategory" value={newCategory} onChange={(ev) => this.handleChange("newCategory", ev.target.value)} />
          </div>
          <button className="form input-field add-button" disabled={newCategory.length === 0} onClick={this.addNewCategory}>
            Add Category
          </button>
        </div>
      </div>
    );
  }
}
