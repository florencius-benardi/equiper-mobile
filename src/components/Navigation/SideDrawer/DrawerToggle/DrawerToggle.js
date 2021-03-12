import React from "react";
import { Icon } from "antd";
import classes from "./DrawerToggle.css";

const drawerToggle = (props) => {
    <Icon
        className={classes.DrawerToggle}
        type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.clicked}
        style={{ color: props.color }}
    />

};

export default drawerToggle;