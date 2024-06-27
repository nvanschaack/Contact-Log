import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function LoginPage() {
  return (
    <Container fluid className='mt-5'>
      <Row>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Login />
        </Col>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <SignUp />
        </Col>
      </Row>
    </Container>
  )
}
