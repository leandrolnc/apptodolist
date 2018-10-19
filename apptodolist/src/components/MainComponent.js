import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { postTask, fetchTasks, editTask } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      tasks: state.tasks
    }
  }

  const mapDispatchToProps = dispatch => ({
    postTask: (description) => dispatch(postTask(description)),
    fetchTasks: () => { dispatch(fetchTasks())},
    editTask: (task) => {dispatch(editTask(task))}
  });

class Main extends Component {

    constructor(props) {
      super(props);
    }  
  
    componentDidMount() {
      
      this.props.fetchTasks();
      
    }
  
    render() {
      
      
        return(
            <div>
                <Header />
                <Home tasks={this.props.tasks} 
                    postTask={this.props.postTask}
                    editTask={this.props.editTask}
                    />
                <Footer/>
            </div>
        );
      
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);