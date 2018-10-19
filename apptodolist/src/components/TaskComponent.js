import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';

class TaskEditDelete extends Component {

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
            <ListGroup>
                
            </ListGroup>
        );
      
    }

}

const Tasks = (props)=>{
    if(props.tasks.length == 0){
        return(
            <div>
                No Tasks
            </div>
        )
    }
    else{
        const tasks =  props.tasks.map((tsk)=>{
            return(
                
            <ListGroupItem key={tsk.id}>
                <div className="clearfix">
                    <div className="float-left">
                        <Input type="checkbox" checked={tsk.done}/>{' '}
                    </div>
                    <div className="float-left">
                        <div>
                            {tsk.description}
                        </div>
                    </div>
                    <div className="float-left">
                        <div>
                            <Button color="link">Edit</Button>/
                            <Button color="link">Delete</Button>
                        </div>
                    </div>                    
                </div>
            </ListGroupItem>
            );
        });

        return(
            <div>
                {tasks}
            </div>
        )
    }
}

export default Tasks;