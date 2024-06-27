import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        contacts: [
            // the User model will have a field on it called contacts which is an array of their contact's IDs
            {
                type: Schema.Types.ObjectId,
                ref: 'Contact'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)
//this is a custom fxn to check a password thats coming in from the client side and checking if it equals the password that's tored in the db
userSchema.methods.checkPassword = async function(password){
    if( password === this.password){
        return true
    }
    else{ 
        return false
    }
}

userSchema.virtual('contactCount').get(function () {
    return this.contacts.length
});

const User = model('user', userSchema);

export default User;