import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_CONTACT } from '../utils/mutations';
import { ONE_CONTACT } from '../utils/queries';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function EditContactForm() {
    //creating ONE state value as an object with all of the properties being the input values
    const [contactForm, setContactForm] = useState({
        _id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    });
    //destructuring the id parameter made in main.jsx so that we can use id in the following code
    const { id } = useParams()
    //you can destructure data and loading from useQuery. 
    //data represents what's being returned from the query to ONE_USER
    const { data, loading } = useQuery(ONE_CONTACT, {
        //contactId is what we send to the backend, and it represents the id from the parameter
        variables: { contactId: id }
    })
    //contact is the data returned from the findContactById query (which includes _id, name, address, email, phone)
    const contact = data?.findContactById || {}

    useEffect(() => {
        if (data && contact) {
            setContactForm(contact)
        }
    }, [data])

    console.log(contactForm);

    const handleChange = (event) => {
        const { name, value } = event.target
        setContactForm({
            ...contactForm, [name]: value
        })
    }
    const [editContact, { err }] = useMutation(EDIT_CONTACT)

    const handleEdit = async (event) => {
        event.preventDefault()
        try {

            await editContact(
                {
                    variables: { ...contactForm }
                },
            )

            document.location.replace('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='m-4' style={{display: 'flex'}}>
            <h1 className='playwright m-4'>Contact Info</h1>
            <form onSubmit={handleEdit}>
                <div className='m-2'>
                    <label>Contact Name:</label>
                    <input
                        value={contactForm.name}
                        name='name'
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='m-2'>
                    <label>Address:</label>
                    <input
                        value={contactForm.address}
                        name='address'
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='m-2'>
                    <label>Email:</label>
                    <input
                        value={contactForm.email}
                        name='email'
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='m-2'>
                    <label>Phone:</label>
                    <input
                        value={contactForm.phone}
                        name='phone'
                        type="tel"
                        onChange={handleChange}
                        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                        required
                        placeholder='###-###-####'
                    />
                </div>
                <div className='m-2'>
                    <Button type='submit'>SUBMIT</Button>
                </div>
            </form>
        </div>
    )
}
