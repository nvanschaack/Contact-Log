import { Schema, Types, model } from 'mongoose'

 const contactSchema = new Schema({
    //schemas don't generate an _id field unless it's a model, so we have to create an id called contactId which is of type ObjectId
    // contactId:{
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId()
    // },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
            'this needs to be in email format'
        ]
    },
    phone: {
        type: String,
        required: true,
        match: [
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            'this needs to be a 10 digit phone number'
        ]
    },
    avatar: {
        type: String,
        required: true
    }
})

const Contact = model('Contact', contactSchema);
export default Contact;