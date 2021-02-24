import { Component } from 'react';
import * as Sentry from '@sentry/react'
import PropTypes from 'prop-types';

class WithErrorBoundaries extends Component {

    state = {
        eventErrorId: null,
        error: null,
        errorInfo: null,
        hasError: false,
    }


    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventErrorId = Sentry.captureException(error);
            this.setState({ eventErrorId, errorInfo });
        });
    }

    render() {
        return this.props.children;
    }
}

WithErrorBoundaries.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default WithErrorBoundaries();

