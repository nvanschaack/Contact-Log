const typeDefs = `
type User {
    _id: ID!
    username: String!
    contacts: [Contact]
}

type Contact {
    _id: ID!
    name: String
    address: String
    email: String
    phone: String
    avatar: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    getAllUsers: [User]!
    oneUser: User
    findContactById(contactId: ID!): Contact 
    viewContacts: [Contact]
}


type Mutation {
    addUser(username: String!, password: String!): Auth

    removeUser(_id: ID!): User

    addContact(name: String!, address: String!, email: String!, phone: String!, avatar: String!): User

    removeContact(contactId: ID!): User

    loginUser(username: String!, password: String!): Auth

    editContact(_id: ID!, name: String, address: String, email: String, phone: String): Contact
}
`   
export default typeDefs;