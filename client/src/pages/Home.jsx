import { useQuery } from '@apollo/client'
import { ONE_USER } from '../utils/queries'
import auth from '../utils/auth'
import { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export default function Home() {

  //useEffect is saying when the Home.jsx component loads, run the checkToken
  useEffect(() => {
    auth.checkToken()
  }, [])

  const { data } = useQuery(ONE_USER)
  //return ALL of the users info, instead of just the contacts
  const userContacts = data?.oneUser || {}
  return (
    <div className='mt-4'>
      <div>
        <h2 style={{textAlign: 'center'}} className='playwright'>Contacts:</h2>
      </div>
      <ListGroup style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* when we loop over an array, each item in the array is now called 'contact', which is populated in the query to display all of contacts info */}
        {userContacts.contacts?.map((contact, i) => (
          //the index is unique for every contact, which is why we can use it as a key
          <ListGroup.Item className='m-2' style={{width: '75%'}}>
            <a key={i} href={`/contact/${contact._id}`} className=''>
              <div style={{display: 'flex', justifyContent: 'space-evenly' }}>
                <img src={contact.avatar} style={{width: '50px', borderRadius: '5rem'}}/>
                <h3>{contact.name}</h3>
                <h3>{contact.phone}</h3>
              </div>

            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
