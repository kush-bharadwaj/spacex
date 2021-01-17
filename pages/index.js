import React, { Component } from 'react';
import { withRouter } from 'next/router';

class IndexPage extends Component {
    componentDidMount() {
        this.props.router.push('/home/dashboard');
    }

    render() {
        return (
            <div> </div>
        );
    }
}

export default withRouter(IndexPage);   