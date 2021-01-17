import React from 'react';
import Dashboard from '../../components/Dashboard';
import Head from 'next/head';
const dashboard = (props) => (
    <div>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Dashboard />
    </div>
);
export default dashboard;