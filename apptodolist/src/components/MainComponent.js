import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { postTask, fetchTasks, updateTask, deleteTask } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      tasks: state.tasks
    }
  }

  const mapDispatchToProps = dispatch => ({
    postTask: (description) => dispatch(postTask(description)),
    fetchTasks: (filter, orderBy) => { dispatch(fetchTasks(filter, orderBy))},
    updateTask: (task) => {dispatch(updateTask(task))},
    deleteTask: (id) => {dispatch(deleteTask(id))}
  });

class Main extends Component {

    constructor(props) {
      super(props);
    }  
  
    componentDidMount() {
      
      this.props.fetchTasks('ALL', undefined);
      
    }
  
    render() {
      
      
        return(
            <div>
                <Header />
                <Home tasks={this.props.tasks} 
                    postTask={this.props.postTask}
                    updateTask={this.props.updateTask}
                    deleteTask={this.props.deleteTask}
                    fetchTask={this.props.fetchTasks}
                    />
                <Footer/>
            </div>
        );
      
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);