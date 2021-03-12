import React from 'react';
import { Menu } from "antd";
import { Icon } from 'leaflet';

const dropdownMenu = (props) => (
    <Menu onClick={props.dropdownMenuClicked} >
        <Menu.Item key="account-settings">
            <Icon type='setting' />Account Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
            <Icon type="logout" />Logout
        </Menu.Item>
    </Menu>
);

export default dropdownMenu;

