import React from 'react';
import Tasks from './TaskComponent'
import { InputGroup, Container, Row, Col, Input, InputGroupAddon, Button, CardBody, Card  } from 'reactstrap';

function Home(props) {

    const listatasks=
        [
            {
                id: 1,
                description: 'Primeira tarefa',
                datetime: '2018-10-18 22:25:00',
                done: false  
            },
            {
                id: 2,
                description: 'Segunda tarefa',
                datetime: '2018-10-18 23:25:00',
                done: true  
            }            
        ];

    return(
        <Container>
            <Row className="align-items-start">
                <Col>
                    <Card>
                        <CardBody>
                        <InputGroup>
                            <Input placeholder="Write new task here..." maxLength="100"/>
                            <InputGroupAddon addonType="append">
                                <Button color="secondary">Create</Button>
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
                            <Tasks tasks={listatasks} />
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}

export default Home;