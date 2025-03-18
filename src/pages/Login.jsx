// import { useFileHandler, useInputValidation } from "6pp";
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import {
//   Avatar,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
// import { bgGradient } from "../constants/color";
// import { server } from "../constants/config";
// import { userExists } from "../redux/reducers/auth";
// import { usernameValidator } from "../utils/validators";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const toggleLogin = () => setIsLogin((prev) => !prev);

//   const name = useInputValidation("");
//   const bio = useInputValidation("");
//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");

//   const avatar = useFileHandler("single");

//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const toastId = toast.loading("Logging In...");

//     setIsLoading(true);
//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/login`,
//         {
//           username: username.value,
//           password: password.value,
//         },
//         config
//       );
//       dispatch(userExists(data.user));
//       toast.success(data.message, {
//         id: toastId,
//       });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     const toastId = toast.loading("Signing Up...");
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("avatar", avatar.file);
//     formData.append("name", name.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);

//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/new`,
//         formData,
//         config
//       );

//       dispatch(userExists(data.user));
//       toast.success(data.message, {
//         id: toastId,
//       });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: bgGradient,
//       }}
//     >
//       <Container
//         component={"main"}
//         maxWidth="xs"
//         sx={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {isLogin ? (
//             <>
//               <Typography variant="h5">Login</Typography>
//               <form
//                 style={{
//                   width: "100%",
//                   marginTop: "1rem",
//                 }}
//                 onSubmit={handleLogin}
//               >
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />

//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />

//                 <Button
//                   sx={{
//                     marginTop: "1rem",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   Login
//                 </Button>

//                 <Typography textAlign={"center"} m={"1rem"}>
//                   OR
//                 </Typography>

//                 <Button
//                   disabled={isLoading}
//                   fullWidth
//                   variant="text"
//                   onClick={toggleLogin}
//                 >
//                   Sign Up Instead
//                 </Button>
//               </form>
//             </>
//           ) : (
//             <>
//               <Typography variant="h5">Sign Up</Typography>
//               <form
//                 style={{
//                   width: "100%",
//                   marginTop: "1rem",
//                 }}
//                 onSubmit={handleSignUp}
//               >
//                 <Stack position={"relative"} width={"10rem"} margin={"auto"}>
//                   <Avatar
//                     sx={{
//                       width: "10rem",
//                       height: "10rem",
//                       objectFit: "contain",
//                     }}
//                     src={avatar.preview}
//                   />

//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       bottom: "0",
//                       right: "0",
//                       color: "white",
//                       bgcolor: "rgba(0,0,0,0.5)",
//                       ":hover": {
//                         bgcolor: "rgba(0,0,0,0.7)",
//                       },
//                     }}
//                     component="label"
//                   >
//                     <>
//                       <CameraAltIcon />
//                       <VisuallyHiddenInput
//                         type="file"
//                         onChange={avatar.changeHandler}
//                       />
//                     </>
//                   </IconButton>
//                 </Stack>

//                 {avatar.error && (
//                   <Typography
//                     m={"1rem auto"}
//                     width={"fit-content"}
//                     display={"block"}
//                     color="error"
//                     variant="caption"
//                   >
//                     {avatar.error}
//                   </Typography>
//                 )}

//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   margin="normal"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                 />

//                 <TextField
//                   required
//                   fullWidth
//                   label="Bio"
//                   margin="normal"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />

//                 {username.error && (
//                   <Typography color="error" variant="caption">
//                     {username.error}
//                   </Typography>
//                 )}

//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />

//                 <Button
//                   sx={{
//                     marginTop: "1rem",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   Sign Up
//                 </Button>

//                 <Typography textAlign={"center"} m={"1rem"}>
//                   OR
//                 </Typography>

//                 <Button
//                   disabled={isLoading}
//                   fullWidth
//                   variant="text"
//                   onClick={toggleLogin}
//                 >
//                   Login Instead
//                 </Button>
//               </form>
//             </>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default Login;





import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username: username.value, password: password.value },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container component={"main"} maxWidth="xs">
        <Paper elevation={6} sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffffcc",
        }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" color="#333" gutterBottom>
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </Typography>

          <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
            <TextField fullWidth label="Username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler} required />
            <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" value={password.value} onChange={password.changeHandler} required />

            <Button variant="contained" color="primary" fullWidth type="submit" disabled={isLoading} sx={{ marginTop: "1.5rem", padding: "0.75rem", borderRadius: "8px" }}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography textAlign="center" m={2} color="gray">OR</Typography>

            <Button fullWidth variant="outlined" onClick={toggleLogin} sx={{ borderRadius: "8px" }}>
              {isLogin ? "Create an Account" : "Login Instead"}
            </Button>
          </form>    
        </Paper>
      </Container>
    </div>
  );
};

export default Login;