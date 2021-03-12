import React from 'react';
import { Menu, Icon } from "antd";
import utility from '@hoc/Shared/utility';
import classes from './DrawerMenu.css';
import { Link } from 'react-router-dom';
import menu from "./ListMenu";
import config from "config";

const drawerMenu = (props) => {
    <Menu
        className={classes.DrawerMenu}
        theme={config.sidebarTheme}
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        selectedKeys={props.paths}>
        {menu.map((item) => {
            //if route doesnt have submenu
            if (!item.submenu) {
                if (item.authobject && utility.havePermissionAccess(item.authobject)) {
                    return (
                        <Menu.Item key={item.key}>
                            <a href={`#${item.path}`}>
                                <Icon type={item.icon} style={{ fontSize: 19 }} /><span>{utility.toUpperFirstChar(item.name)}</span>
                            </a>
                        </Menu.Item>
                    )
                } else if (!item.authobject) {
                    return (
                        <Menu.Item key={item.key}>
                            <a href={`#${item.path}`}>
                                <Icon type={item.icon} style={{ fontSize: 19 }} /><span>{utility.toUpperFirstChar(item.name)}</span>
                            </a>
                        </Menu.Item>
                    )
                }
                return null
            }

            //if route has sub routes
            else if (item.submenu) {
                //hide parent if user doesnt have any auth object in sub
                let hasAnyAuthObjectInSub = item.submenu.map(i => utility.havePermissionAccess(i.authobject))
                if (!hasAnyAuthObjectInSub.includes(true)) { return null }
                return (
                    <Menu.SubMenu
                        key={item.key}
                        title={<span><Icon type={item.icon} style={{ fontSize: 19 }} /><span>{utility.toUpperFirstChar(item.name)}</span></span>}
                    >
                        {item.submenu.map((sub) => {
                            if (!sub.submenu) {
                                if (sub.authobject && utility.havePermissionAccess(sub.authobject)) {
                                    return (<Menu.Item key={sub.key}><Link to={sub.path}>{utility.toUpperFirstChar(sub.name)}</Link></Menu.Item>)
                                } if (!sub.authobject) {
                                    return (<Menu.Item key={sub.key}><Link to={sub.path}>{utility.toUpperFirstChar(sub.name)}</Link></Menu.Item>)
                                }
                                return null
                            }
                            //if route doesnt have component but has sub routes
                            else if (sub.submenu) {
                                //hide parent if user doesnt have any auth object in sub
                                let hasAnyAuthObjectInSub = sub.submenu.map(i => utility.havePermissionAccess(i.authobject))
                                if (!hasAnyAuthObjectInSub.includes(true)) { return null }
                                return (
                                    <Menu.SubMenu
                                        key={sub.key}
                                        title={<span>{utility.toUpperFirstChar(sub.name)}</span>}
                                    >
                                        {sub.submenu.map((subA) => {
                                            if (!subA.submenu) {
                                                if (subA.authobject && utility.havePermissionAccess(subA.authobject)) {
                                                    return (<Menu.Item key={subA.key}><Link to={subA.path}>{utility.toUpperFirstChar(subA.name)}</Link></Menu.Item>)
                                                } else if (!subA.authobject) {
                                                    return (<Menu.Item key={subA.key}><Link to={subA.path}>{utility.toUpperFirstChar(subA.name)}</Link></Menu.Item>)
                                                }
                                                return null
                                            }
                                            else { return null }
                                        })}
                                    </Menu.SubMenu>
                                )
                            }
                            else { return null }
                        })}
                    </Menu.SubMenu>
                )
            }

            //redirect routing
            else {
                return null
            }
        })
        }

    </Menu>

}

export default drawerMenu;