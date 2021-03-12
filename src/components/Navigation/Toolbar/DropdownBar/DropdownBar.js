import React from "react";
import { Avatar, Dropdown } from "antd";
import classes from "./DropdownBar.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

const dropdownBar = (props) => {
    <Dropdown overlay={<DropdownMenu dropdownMenuClicked={props.dropdownMenuClicked} />}>
        <div className={classes.DropdownToolbar}>
            <Avatar
                className={classes.AvatarNavigation}
                src={props.dataUser && props.dataUser.detail ? props.dataUser.detail.photo_url_full : null}
                size="medium">
                {props.dataUser && props.dataUser.name ? props.dataUser.name.charAt(0) : ''}
            </Avatar>
        </div >
    </Dropdown >
};

export default dropdownBar;