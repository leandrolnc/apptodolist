import React, {Component} from 'react';
import Tasks from './TaskComponent'
import { InputGroup, Container, Row, Col, Input, InputGroupAddon, Button, CardBody, Card, Label  } from 'reactstrap';


class Home extends Component {

    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
            description: ''
        };
    }

    handleSubmit() {
        if(this.state.description.length > 0){
            this.props.postTask(this.state.description);
        };
    }       

    handleOnChange(event){
        this.setState({description: event.target.value});
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
                        <h4>Tasks</h4>
                        <Card>
                            <CardBody>
                                <Tasks tasks={this.props.tasks.tasks} 
                                    updateTask={this.props.updateTask}
                                    deleteTask={this.props.deleteTask}
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
                        <Input type="checkbox" />{' '}
                    </Col>
                </Row>
            </Container>
        );
    
    }

}

export default Home;