import React from 'react';
import { Layout } from "antd";
import DrawerMenu from "./DrawerMenu/DrawerMenu";


const sideDrawer = (props) => {
    <Layout.Sider
        collapsible
        theme={props.sidebarTheme}
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            backgroundImage: props.theme ? `linear-gradient(${props.theme.primary_color}, ${props.theme.secondary_color})` : `linear-gradient(#fff, #fff)`
        }}
        width={256}
        trigger={null}
        collapsed={props.collapsed}
        // breakpoint="lg"
        //collapsedWidth="0"
        //onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed) => {
            this.setCollapse(collapsed)
        }}
    >
        <DrawerMenu />
    </Layout.Sider>
};

export default sideDrawer;