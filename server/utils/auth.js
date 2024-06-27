import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

//authMiddleware decodes the token so that we can access the content within the token 
//if a token exists, it means that the user is logged in
export const authMiddleware = function ({ req }) {
  // allows token to be sent via req.body, req.query, or headers

  let token = req.body.token || req.query.token || req.headers.authorization;

  // We split the token string into an array and return actual token 
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  // jwt.verify(token, secret, { maxAge: expiration }) returns an object. data is a property on that object, which is why its being destructured. Then, were setting a new property on the request object called 'user' and equals the value of data. Data includes username and _id (which is what payload represents)
  try {
    //verify decodes 
    //data is a propery on token, which includes the payload. Payload in this case is {username, _id}
    const { data } = jwt.verify(token, secret, { maxAge: expiration });

    //req.user is a property on the req object
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  // return the request object so it can be passed to the resolver as `context`. context is set to the value of what is returned from the authMiddleware fxn in the server.js
  return req;
}

// this fxn creates a token for context thats stored in payload
//context property stores whatever authMiddleware returns, in this case it's returning req
export const signToken = function ({ username, _id }) {
  const payload = { username, _id };
  //sign encodes a string= token
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
