import { gql } from "@apollo/client";

export const ONE_USER = gql`
query oneUser {
  oneUser {
    _id
    username
    contacts {
      _id
      address
      email
      name
      phone
      avatar
    }
  }
}
`;

export const ONE_CONTACT = gql`
query oneContact($contactId: ID!) {
  findContactById(contactId: $contactId) {
    _id
    name
    address
    email
    phone
    avatar
  }
}
`

