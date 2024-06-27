import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {
    //using an object to store state of username AND password
    const [userForm, setUserForm] = useState({
        username: '',
        password: ''
    });
    const [loginUser, { error }] = useMutation(LOGIN_USER)

    const handleChange = (event) => {
        //event.target is the element that the event is targeting. in this case it is the INPUT element in the form
        const { name, value } = event.target;
        //spreading userForm which has the username and password properties on it.
        //then taking the name property from the input element which is set equal to username or password, and setting the value the user gives it when they start typing . 
        //this is stored as setUserForm 
        setUserForm({ ...userForm, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(userForm)
        try {
            //bring in the mutation function called loginUser to log in a user. this function takes in whatever arguments are defined in the typedefs file (in this case its username and password) and is stated 'variables'.
            //here we are just getting access to the data property on the loginUser object so that we can use it in the next line
            const { data } = await loginUser({
                variables: { ...userForm }
            });

            Auth.login(data.loginUser.token)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div style={{width: '75%'}}>
            <Form
                onSubmit={handleSubmit}
            >
                <h1 className='playwright'>LOGIN</h1>
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
