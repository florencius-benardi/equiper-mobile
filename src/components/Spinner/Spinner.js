import React from 'react';
import { Spin } from 'antd';
import styles from './Spinner.css';

const SpinLoader = () => {
    return (
        <div className={styles.position}>
            <Spin />
        </div>
    );
}

export default SpinLoader;