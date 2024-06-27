import decode from "jwt-decode";


class AuthenticationFunctions {
    //this is taking in a token and putting in local storage,
    //once they are logged in, we are redirecting them to the contact page
    login(token) {
        localStorage.setItem('token', token)
        document.location.replace('/')
    }

    //this is deleting a token from local storage once the user logs out
    logout() {
        localStorage.removeItem('token')
        window.location.assign('/')
    }

    //retrieves the token from local storage
    getToken() {
        return localStorage.getItem('token')
    }

    checkExp(token) {
        try {
            //taking in the token and decoding it
            const decodedToken = decode(token)
            // const decodedDate =  new Date(decodedToken.exp * 1000)
            // const dateNow = new Date
            // console.log('decoded',decodedDate)
            // console.log('now', dateNow);
            //compare if decodedToken exp property is less than current date, if it is less than current date, then return true
            return decodedToken.exp < Date.now() / 1000
        } catch (err) {
            return false
        }
    }

    //get the token, then returns ternary that returns true or false
    loggedIn() {
        //get token
        //'this' b/c accessing something within the AuthenticationFunction
        const token = this.getToken()
        //this is setting a variable called isExpiredToken to the value of the checkExp fxn above, which either returns true or false
        const isExpiredToken = this.checkExp(token)
        //if the token returns truthy (meaning it exists in local storage, !! returns the boolean value) AND the token is NOT expired (meaning it returned falsey), THEN return true
        // return !!token && !isExpiredToken
        if (!!token && !isExpiredToken) {
            //means user is logged in
            return true
        } else {
            return false
        }
    }

    checkToken(){
        const token = this.getToken();
        if(token && this.checkExp(token)){
            this.logout()
        }
        
    }

    decodedToken(){
        return decode(this.getToken())
    }

}
//you have to create a NEW instance AuthenticationFunctions in order for it to run
export default new AuthenticationFunctions();