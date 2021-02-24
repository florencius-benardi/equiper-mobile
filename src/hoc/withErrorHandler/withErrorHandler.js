import React, { Component } from 'react';

// import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxs/auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';


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