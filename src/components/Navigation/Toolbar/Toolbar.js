import React from "react";
import classes from "./Toolbar.css"
import { Col, Layout, Row } from "antd";
import DrawerToggle from "@components/Navigation/SideDrawer/DrawerToggle/DrawerToggle";
import DrawerImage from "@components/Navigation/SideDrawer/DrawerImage/DrawerImage";
import DropdownBar from "./DropdownBar/DropdownBar";

const toolbar = (props) => {
    <Layout.Header className={classes.HeaderToolbar}
        style={{ background: props.headerBgColor }}
    >
        <Row type="flex">
            <Col md={{ span: 22 }}>
                <DrawerToggle clicked={props.drawerToggleClicked}
                    color={props.themesColor}
                    collapsed={props.drawerCollapsed} />
                <DrawerImage />
            </Col>
            <Col md={2} style={{ paddingRight: 0 }}>
                <Col md={{ span: 6, offset: 4 }} >
                    <DropdownBar />
                </Col>
            </Col>
        </Row>
    </Layout.Header>
}

export default toolbar;