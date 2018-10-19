import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {

    constructor(props) {
      super(props);
    }  
  
    componentDidMount() {
      /*  
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
      */
    }
  
    render() {
      
      
        return(
            <div>
                <Header />
                <Home/>
                <Footer/>
            </div>
        );
      
    }

}

export default Main;