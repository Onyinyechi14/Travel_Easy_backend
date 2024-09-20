// // utils/generateToken.js
// import jwt from 'jsonwebtoken';

// // Function to generate a JWT token for the user
// const generateToken = (id, role) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: '30d',
//       });

//       return token;
// };

// export default generateToken;



// utils/generateToken.js
import jwt from 'jsonwebtoken';

// Function to generate a JWT token for the user
const generateToken = (id, role) => {
  // Ensure that JWT secret is defined in your environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  // Generate the token with the user ID and role included in the payload
  const token = jwt.sign(
    { userId: id, userRole: role }, // Payload: id and role
    process.env.JWT_SECRET,         // Secret key
    {
      expiresIn: '30d',             // Expiry time
    }
  );

  return token;
};

export default generateToken;
