import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Input, Modal, ModalHeader, ModalBody, Row, Col, Container } from 'reactstrap';
//@flow
class TaskEditDelete extends Component {

    constructor(props) {
      super(props);

      this.toggleEdit = this.toggleEdit.bind(this);
      this.toggleDelete = this.toggleDelete.bind(this);
      this.editTask = this.editTask.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDone = this.onChangeDone.bind(this);
  
      this.state = {
          task: {},
          isOpenEdit: false,
          isOpenDelete: false
      };      
    }
    
    toggleEdit() {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit
        });
      }   

      toggleDelete() {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        });
      }         

    editTask = ()=>{
        this.setState({
            isOpenEdit: true, 
            task: this.props.task
        });
    }

    deleteTask = () =>{
        this.setState({
            isOpenDelete: true, 
            task: this.props.task
        });
    }

    onChangeDescription = (event) =>{

        let tsk = Object.assign({}, this.state.task);
        tsk.description = event.target.value;
        this.setState({task: tsk});
    }

    onChangeDone = (event) => {
        let tsk = Object.assign({}, this.state.task);
        tsk.done = !this.state.task.done;
        this.setState({task: tsk});
        //console.log(event.target.value);
    }

    doUpdate = () =>{
        this.props.updateTask(this.state.task);
    }

    doDelete = () =>{
        this.props.deleteTask(this.state.task.id);
    }

    componentDidMount() {
        
    }

    
    render() {

        return(
            <Container>
                <div>
                    <Button color="link" onClick={this.editTask}>Edit</Button>/
                    <Button color="link" onClick={this.deleteTask}>Delete</Button>
                </div>
                <Modal isOpen={this.state.isOpenEdit} toggle={this.toggleEdit}>
                    <ModalHeader toggle={this.toggleModal}>Edit task</ModalHeader>
                    <ModalBody>
                        <Row className="form-group">
                            <Col>
                                <Input type="checkbox" checked={this.state.task.done} onChange={this.onChangeDone}/>{' '}
                            </Col>
                            <Col>
                                <Input type="text" value={this.state.task.description} onChange={this.onChangeDescription}/>    
                            </Col>
                            <Col>
                                <Button onClick={this.doUpdate}>Save</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOpenDelete} toggle={this.toggleDelete}>
                    <ModalHeader toggle={this.toggleModal}>Delete task</ModalHeader>
                    <ModalBody>
                        <Row className="form-group">
                            <Col>
                                {this.state.task.description}
                            </Col>
                            <Col>
                                Do you confirm this operation?  
                            </Col>
                            <Col>
                                <Button onClick={this.doDelete}>Confirm</Button>

                                <Button onClick={this.toggleDelete}>Cancel</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>

            </Container>
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
                        <TaskEditDelete task={tsk} updateTask={props.updateTask} deleteTask={props.deleteTask}/>
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