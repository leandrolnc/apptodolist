import React, {Component} from 'react';
import Tasks from './TaskComponent'
import { InputGroup, Container, Row, Col, Input, InputGroupAddon, Button, CardBody, Card, Label  } from 'reactstrap';


class Home extends Component {

    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
    
        this.state = {
            description: '',
            hideComplete: false,
            orderBy: 'DATE_ADDED'
        };
    }

    handleSubmit() {
        if(this.state.description.length > 0){
            this.props.postTask(this.state.description);
            this.setState({description: ''});
        };
    }       

    handleOnChange(event){
        this.setState({description: event.target.value});
    }

    handleHide(){
        this.setState({hideComplete: !this.state.hideComplete});

        let filter = (!this.state.hideComplete ? 'INCOMPLETE' : undefined); 

        this.props.fetchTask(filter, this.state.orderBy);
    }

    handleOrder(){
        if(this.state.orderBy == 'DATE_ADDED'){
            this.setState({orderBy: 'DESCRIPTION'});
        }
        else{
            this.setState({orderBy: 'DATE_ADDED'});
        }
        let filter = (this.state.hideComplete ? 'INCONPLETE' : undefined); 
        this.props.fetchTask(filter, this.state.orderBy);
    }

    render() {
        return(
            <Container>
                <Row className="align-items-start">
                    <Col>
                        <Card>
                            <CardBody>
                                <InputGroup>
                                    <Input placeholder="Write new task here..." maxLength="100" value={this.state.description} onChange={this.handleOnChange}/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary" onClick={this.handleSubmit}>Create</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="link" onClick={this.handleOrder}>Tasks</Button>
                        <Card>
                            <CardBody>
                                <Tasks tasks={this.props.tasks.tasks} 
                                    updateTask={this.props.updateTask}
                                    deleteTask={this.props.deleteTask}
                                    hideComplete={this.state.hideComplete}
                                    />
                            </CardBody>
                        </Card>
    
                    </Col>
                </Row>
                <Row >
                    <Col xs="auto">
                       Hide completed
                    </Col>
                    <Col xs="auto">
                        <Input type="checkbox" onChange={this.handleHide}/>{' '}
                    </Col>
                </Row>
            </Container>
        );
    
    }

}

export default Home;