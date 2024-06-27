import User from '../models/User.js'
import Contact from '../models/Contact.js';

import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        oneUser: async (_, args, context) => {
            // context comes from the server.js which is set equal to what the authMiddleware returns (in auth.js) which is req.
            //req has a property on it called user. User returns data which is an object that includes username and _id
            if (context.user) {
                // console.log(context);
                const userData = await User.findOne({ _id: context.user._id }).populate('contacts')
                return userData
            }
            throw AuthenticationError
        },
        findContactById: async (_, args, context) => {
            if (context.user) {
                const contact = await Contact.findOne({ _id: args.contactId })
                return contact
            }

            throw AuthenticationError
        },
        viewContacts: async () => {
            return Contact.find();
        }
    },
    Mutation: {
        //signup
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        removeUser: async (_, args) => {
            return User.findOneAndDelete({ _id: args._id })
        },
        addContact: async (_, args, context) => {
            if (context.user) {
                const contactData = await Contact.create(args)

                const userData = await User.findOneAndUpdate(
                    // 3 objects used to update
                    // 1st object is the filter object, the _id of the User needs to match the user's _id passed thru context
                    { _id: context.user._id },
                    // once we locate the User with the matching _id, then we push into the contacts array, the id of the contact
                    { $push: { contacts: contactData._id } },
                    // return the updated User
                    { new: true }
                )

                return userData

            }
            throw AuthenticationError
        },
        removeContact: async (_, args, context) => {
            if (context.user) {
                try {
                    const contact = await Contact.findOneAndDelete({ _id: args.contactId })

                    const userData = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { contacts: contact._id } },
                        { new: true }
                    );

                    return userData
                } catch (error) {
                    console.log(error);
                }
            }
            throw AuthenticationError
        },
        //recieve the value of username and password
        loginUser: async (_, { username, password }) => {
            try {
                //check to see if the user exists by the username
                const user = await User.findOne({ username: username });

                if (!user) {
                    throw AuthenticationError
                }

                //if the user exists, then we have to compare the password the user sent in with the password thats saved in the database
                const pwd = await user.checkPassword(password)

                if (!pwd) {
                    throw AuthenticationError
                }

                //if that returns true, then create token
                const token = signToken(user);

                return { token, user };

            } catch (error) {
                console.log(error);
            }
        },
        editContact: async (_, args, context) => {
            if (context.user) {
                const contact = await Contact.findOneAndUpdate(
                    //finding the contact by the contactId we pass in as an argument on graphql
                    { _id: args._id },
                    //setting whatever argument (args includes name, address, email & phone) as the updated contact 
                    { $set: { ...args } },
                    { new: true }
                )

                return contact
            }
            throw AuthenticationError
        }
    }
};

export default resolvers