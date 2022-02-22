import React, { Component } from 'react';
import Header from '../component/Header';
import List from '../component/List';
import Footer from '../component/Footer';

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <List />
                HOME
                <Footer />
            </div>
        )
    }
}

export default Home;