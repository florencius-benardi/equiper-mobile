import React, { Component } from 'react';

// import Modal from '../../components/UI/Modal/Modal';
import Aux from '@/hoc/Auxs/auxiliary';
import useHttpErrorHandler from '@/hoc/hooks/http-error-handler';

class WithErrorHandler extends Component {

}

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default withErrorHandler;
