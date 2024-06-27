import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const SIGNUP_USER = gql`
mutation addUser($username: String!, $password: String!) {
  addUser(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`

export const ADD_CONTACT =gql`
mutation addContact($name: String!, $address: String!, $email: String!, $phone: String!, $avatar: String!) {
  addContact(name: $name, address: $address, email: $email, phone: $phone, avatar: $avatar) {
    _id
    username
    contacts {
      _id
    }
  }
}
`

export const EDIT_CONTACT = gql`
mutation editContact($_id: ID!, $name: String, $address: String, $email: String, $phone: String) {
  editContact(_id: $_id, name: $name, address: $address, email: $email, phone: $phone, ) {
    _id
    name
    address
    email
    phone
  }
}
`

export const REMOVE_CONTACT = gql`
mutation removeContact($contactId: ID!) {
  removeContact(contactId: $contactId) {
    _id
    username
    contacts {
      _id
    }
  }
}
`