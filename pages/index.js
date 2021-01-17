import React, { Component } from 'react';
import { withRouter } from 'next/router';

class IndexPage extends Component {
    componentDidMount() {
        this.props.router.push('/home/dashboard');
    }
    // componentDidUpdate(prevprops, nextprops){
    //     console.log(prevprops.router);
    //     console.log(nextprops.router);
    // }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default withRouter(IndexPage);   