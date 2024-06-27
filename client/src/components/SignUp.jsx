import { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignUp() {
    //using an object to store state of username AND password
    const [userForm, setUserForm] = useState({
        username: '',
        password: ''
    });

    const [addUser, { error }] = useMutation(SIGNUP_USER)

    const handleChange = (event) => {
        //event.target is the element that the event is targeting. in this case it is the INPUT element in the form
        const { name, value } = event.target;
        //spreading userForm which has the username and password properties on it.
        //then taking the name property from the input element which is set equal to username or password, and setting the value the user gives it when they start typing . 
        //this is stored as setUserForm 
        setUserForm({ ...userForm, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const { data } = await addUser({
                variables: { ...userForm }
            })

            Auth.login(data.addUser.token)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div style={{width: '75%'}}>
            <Form
                onSubmit={handleSubmit}
            >
                <h1 className='playwright'>SIGN UP</h1>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name='username'
                        placeholder='username'
                        //using the state of value at the username property
                        value={userForm.username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name='password'
                        placeholder='password'
                        //using the state of value at the password property
                        value={userForm.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div>
                    <Button type='submit'>SUBMIT</Button>
                </div>
            </Form>
        </div>
    )
}
