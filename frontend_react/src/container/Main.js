import React, { Component } from 'react';
import Header from '../component/Header';
import List from '../component/List';
import Footer from '../component/Footer';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <List />
                MAIN
                <Footer />
            </div>
        )
    }
}

export default Main;