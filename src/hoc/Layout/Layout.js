import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '@hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '@/components/Navigation/Toolbar/Toolbar';
import SideDrawer from '@/components/Navigation/SideDrawer/SideDrawer';
import * as actions from '@actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    componentDidMount() {

    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };

};
const mapDispatchToProps = dispatch => {
    return {
        onInitApplicationSetup: () => dispatch(actions.readApplicationSetup()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout, axios);