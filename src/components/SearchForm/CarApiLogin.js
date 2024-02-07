// import axios from "axios";
// import Jwt from "jsonwebtoken";
// const fetchJwtToken = async () => {
//   const credentials = {
//     api_token: "0ff4d08f-ab26-496a-98fb-ab308cf8c9ed",
//     api_secret: "52548ce4320eb9d8b65f3009f0e12ed7",
//   };

//   let token =
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiZGU3Y2Y1NTctMDM2OS00ZWViLTkyNDgtNTFjMzM4ZThhNDA0IiwiYXVkIjoiZGU3Y2Y1NTctMDM2OS00ZWViLTkyNDgtNTFjMzM4ZThhNDA0IiwiZXhwIjoxNzAxMTg1ODcwLCJpYXQiOjE3MDA1ODEwNzAsImp0aSI6IjJiNTVkNjZjLTI4NjMtNDhlNi04NzBjLTcxZTQ0NjM2YzdlMSIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCJ9fQ.gpijYupRiS_7oVEEBKWeFKU21R_X88xRbQzPaCMrV6s";

//   try {
//     const decodedToken = Jwt.decode(token);
//     const currentTime = Math.floor(Date.now() / 1000);

//     if (decodedToken.exp < currentTime + 60) {
//       // Token is expired or about to expire, refresh it
//       const response = await axios.post(
//         "https://carapi.app/api/auth/login",
//         credentials,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         console.log("Fetch JWT token success");

//         token = response.data; // Assuming the response directly contains the new token
//         return token;
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   return token;
// };

// export default fetchJwtToken;
