import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_CONTACT } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function ContactForm() {
    //creating ONE state value as an object with all of the properties being the input values
    const [contactForm, setContactForm] = useState({
        name: '',
        address: '',
        email: '',
        phone: ''
    });

    const [selectedImage, setSelectedImage] = useState('')

    const [addContact] = useMutation(ADD_CONTACT)

    const arrayOfAvatars = [
        {
            name: 'generic brunette female',
            url: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?w=1060'
        },
        {
            name: 'generic black-haired female',
            url: 'https://img.freepik.com/premium-vector/tv-press-person-icon-flat-illustration-tv-press-person-vector-icon-web-design_98396-33760.jpg?w=1060'
        },
        {
            name: 'generic blonde female',
            url: 'https://img.freepik.com/premium-vector/avatar-blonde-woman-icon-cartoon-style-faceless-girl-isolated-white-background_98402-77346.jpg?w=1060'
        },
        {
            name: 'generic black-haired male',
            url: 'https://img.freepik.com/premium-vector/male-portrait-style-icon-flat-vector-model-mouth-facial_98396-70961.jpg?w=1060'
        },
        {
            name: 'generic brunette male',
            url: 'https://img.freepik.com/premium-vector/young-man-rhombus-diamond-pattern-sweater-round-avatar-face-icon-flat-style_768258-3386.jpg?w=1060'
        },
        {
            name: 'generic red-haired male',
            url: 'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?w=1060'
        },
        {
            name: 'generic old male',
            url: 'https://img.freepik.com/premium-vector/elderly-senior-man-glasses-with-beard-mustache-avatar-face-icon-flat-style_768258-3176.jpg?w=1060'
        },
        {
            name: 'generic old female',
            url: 'https://img.freepik.com/premium-vector/nursing-elderly-icon-flat-illustration-nursing-elderly-vector-icon-web-design_98396-38052.jpg?w=1060'
        }
    ]
    const imageValue = (e) => {
        console.log(e);
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setContactForm({
            ...contactForm, [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {

            await addContact({
                variables: { ...contactForm, avatar: selectedImage }
            })

            document.location.replace('/')

        } catch (error) {
            console.error(error)
        }
        // console.log(contactForm);
    }

    return (
        <div className='m-4' style={{ display: 'flex' }}>
            <h1 className='playwright m-4'>Contact Info</h1>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <DropdownButton id="dropdown-basic-button" title="Choose an avatar" variant='success'>
                        <Dropdown.Item >Choose an avatar</Dropdown.Item>
                        {arrayOfAvatars.map((avatar, i) => (
                            <Dropdown.Item value={avatar.url} onClick={() => setSelectedImage(avatar.url)}>
                                <img src={avatar.url} alt="" style={{ width: "50px", height: "auto" }} />
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className='m-2'>
                    <Button type='submit'>SUBMIT</Button>
                </div>
            </form>
        </div>
    )
}
