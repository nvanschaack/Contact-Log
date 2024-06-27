import { useQuery, useMutation } from '@apollo/client'
import { ONE_CONTACT } from '../utils/queries'
import { useParams } from 'react-router-dom'
import { EDIT_CONTACT, REMOVE_CONTACT } from '../utils/mutations'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ContactPage() {
    //destructuring the id parameter made in main.jsx so that we can use id in the following code
    const { id } = useParams()
    //you can destructure data and loading from useQuery. 
    //data represents what's being returned from the query to ONE_USER
    const { data, loading } = useQuery(ONE_CONTACT, {
        variables: { contactId: id }
    })
    //contact is the data returned from the findContactById query (which includes _id, name, address, email, phone)
    const contact = data?.findContactById || {}
    // console.log(contact);

    const [removeContact, { error }] = useMutation(REMOVE_CONTACT)
    const handleDelete = async () => {
        const { data } = await removeContact(
            {
                variables: { contactId: id }
            }
        )
        document.location.replace('/')
    }

    const handleEdit = async () => {
        document.location.replace(`/Contact/edit/${id}`)
    }

    return (
        <div className='m-5' style={{display: 'flex', justifyContent: 'center'}}>
            {/* loading is used here to allow time for the API call to finish, if not it's expecting data to be loaded right away */}
            {loading ? (<h1> loading...</h1>) : (
                <Card className='p-5' style={{ width: '25rem' }}>
                    <img src={contact.avatar} style={{ borderRadius: "5rem", width: '100px', margin: '2%' }} />
                    <Card.Body>
                        <Card.Title>{contact.name}</Card.Title>
                        <Card.Text>
                            Address: {contact.address}
                        </Card.Text>
                        <Card.Text>
                            Phone: {contact.phone}
                        </Card.Text>
                        <Card.Text>
                            Email: <a href={`mailto:${contact.email}`}> {contact.email}</a>
                        </Card.Text>
                        <Button variant="primary" onClick={handleEdit} className='mx-2 '>Edit</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Card.Body>
                </Card>

            )}


        </div>
    )
}
