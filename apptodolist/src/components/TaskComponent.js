//@flow
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Input, Modal, ModalHeader, ModalBody, Row, Col, Container, InputGroup, InputGroupAddon } from 'reactstrap';

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
          task: props.task,
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
        console.log(event.target.value);
        
        this.props.updateTask({id: this.state.task.id, state: !this.state.task.state});

        let tsk = Object.assign({}, this.state.task);
        tsk.state = !this.state.task.state;
        this.setState({task: tsk});
    }

    doUpdateDesc = () =>{
        this.props.updateTask({id: this.state.task.id, description: this.state.task.description});
        this.toggleEdit();
    }

    doDelete = () =>{
        this.props.deleteTask(this.state.task.id);
        
    }

    componentDidMount() {
        
    }

    handleKeyPress = (e) =>{
        console.log(e.keyCode);
        
        if(e.keyCode === 13){
            this.doUpdateDesc();
        }
        else if (e.keyCode === 27){
            this.toggleEdit();
        }
        
    }

    
    render() {

        return(
            <Container>
                <Row className="form-group">
                    <Col xs="1">
                        <Input type="checkbox" checked={this.state.task.state} onChange={this.onChangeDone}/>{' '}
                    </Col>
                    <Col xs="6">{ 

                            (!this.state.isOpenEdit ? 
                            <div>
                                {this.props.task.description}
                            </div>
                            :
                            <div>
                                <InputGroup>
                                    <Input maxLength="100" value={this.state.task.description} onChange={this.onChangeDescription} onKeyDown={this.handleKeyPress}/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary" onClick={this.doUpdateDesc}>Save</Button>
                                    </InputGroupAddon>
                                </InputGroup>                            
                            </div>
                            )
                        }
  
                    </Col>
                    <Col >
                        
                            {(!this.state.isOpenEdit ? 
                                <div>
                                <Button color="link" onClick={this.toggleEdit}>Edit</Button>/
                                <Button color="link" onClick={this.deleteTask}>Delete</Button>
                                </div>
                             :
                             <div></div>)                            
                            }
                        
                    </Col>
                </Row>

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
                <TaskEditDelete task={tsk} updateTask={props.updateTask} deleteTask={props.deleteTask}/>
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