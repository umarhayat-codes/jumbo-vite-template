// import {
//   Box,
//   Card,
//   CardContent,
//   Divider,
//   FormControlLabel,
//   FormGroup,
//   Link,
//   List,
//   Stack,
// } from "@mui/material";
// import React from "react";

// import {
//   Button,
//   Checkbox,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { Div, Span } from "@jumbo/shared";
// import { ListItem, ListItemText } from "@mui/material";

// import { RiDeleteBin3Line } from "react-icons/ri";
// import { SettingHeader } from "../../SettingHeader";

// const EmailAccessSettings = () => {
//   return (
//     <>
//       <SettingHeader title={"Email Access"} divider sx={{ mb: 3 }} />
//       <Card sx={{ mb: 3.75 }}>
//         <CardContent>
//           <Div sx={{ display: "flex", minWidth: 0, alignItems: "flex-start" }}>
//             <Div sx={{ flex: 1, mr: 2 }}>
//               <Typography variant="h4">
//                 umar.chris@example.com - {""}
//                 <Span sx={{ color: "success.main" }}>Primary</Span>
//               </Typography>
//               <Typography variant="body1">
//                 This email will be used for account-related notifications and
//                 can also be used for password resets.
//               </Typography>
//             </Div>
//             <Stack
//               spacing={1}
//               direction={"row"}
//               alignItems={"center"}
//               flexShrink={0}
//             >
//               <IconButton aria-label="delete">
//                 <RiDeleteBin3Line />
//               </IconButton>
//             </Stack>
//           </Div>
//           <List
//             sx={{
//               listStyle: "disc",
//               pl: 2,
//               ".MuiListItem-root": {
//                 display: "list-item",
//                 py: 0.5,
//               },
//             }}
//           >
//             <ListItem disableGutters>
//               <ListItemText
//                 primary={
//                   <Typography variant="h5" fontSize={15} mb={0.5}>
//                     Visible in emails
//                   </Typography>
//                 }
//                 secondary={
//                   <React.Fragment>
//                     <Typography
//                       component="span"
//                       variant="body2"
//                       sx={{ color: "text.primary", display: "inline" }}
//                     >
//                       This email may be used as the ‘author’ address for
//                       web-based operations
//                     </Typography>
//                   </React.Fragment>
//                 }
//               />
//             </ListItem>
//             <ListItem disableGutters>
//               <ListItemText
//                 primary={
//                   <Typography variant="h5" fontSize={15} mb={0.5}>
//                     Receives notifications
//                   </Typography>
//                 }
//                 secondary={
//                   <React.Fragment>
//                     <Typography
//                       component="span"
//                       variant="body2"
//                       sx={{ color: "text.primary", display: "inline" }}
//                     >
//                       This email address is the default used for notifications
//                     </Typography>
//                   </React.Fragment>
//                 }
//               />
//             </ListItem>
//           </List>
//         </CardContent>
//         <Divider />
//         <CardContent>
//           <Div sx={{ display: "flex", minWidth: 0, alignItems: "flex-start" }}>
//             <Div sx={{ flex: 1, mr: 2 }}>
//               <Typography variant="h4">c.smith@example.com</Typography>
//               <Typography variant="body1">
//                 This email will be used for account-related notifications and
//                 can also be used for password resets.
//               </Typography>
//             </Div>
//             <Stack
//               spacing={1}
//               direction={"row"}
//               alignItems={"center"}
//               flexShrink={0}
//             >
//               <Button
//                 size="small"
//                 variant="outlined"
//                 sx={{ textTransform: "none" }}
//               >
//                 make primary
//               </Button>
//               <IconButton aria-label="delete" color="error">
//                 <RiDeleteBin3Line />
//               </IconButton>
//             </Stack>
//           </Div>
//           <List
//             sx={{
//               listStyle: "disc",
//               pl: 2,
//               pb: 0,
//               ".MuiListItem-root": {
//                 display: "list-item",
//                 py: 0.5,
//               },
//             }}
//           >
//             <ListItem disableGutters>
//               <ListItemText
//                 primary={
//                   <Typography variant="h5" fontSize={15} mb={0.5}>
//                     <Typography
//                       component={"span"}
//                       fontSize={"inherit"}
//                       color={"warning.main"}
//                     >
//                       Unverified
//                     </Typography>{" "}
//                     -{" "}
//                     <Link href="#" underline="none">
//                       Resend Verification Email
//                     </Link>
//                   </Typography>
//                 }
//                 secondary={
//                   <React.Fragment>
//                     <Typography
//                       component="span"
//                       variant="body2"
//                       sx={{ color: "text.primary", display: "inline" }}
//                     >
//                       Unverified email addresses cannot receive notifications or
//                       be used to reset your password.
//                     </Typography>
//                   </React.Fragment>
//                 }
//               />
//             </ListItem>
//             <ListItem disableGutters>
//               <ListItemText
//                 primary={
//                   <Typography variant="h5" fontSize={15} mb={0.5}>
//                     Not visible in Emails
//                   </Typography>
//                 }
//                 secondary={
//                   <React.Fragment>
//                     <Typography
//                       component="span"
//                       variant="body2"
//                       sx={{ color: "text.primary", display: "inline" }}
//                     >
//                       This email address is not going to be used anywhere in the
//                       app.
//                     </Typography>
//                   </React.Fragment>
//                 }
//               />
//             </ListItem>
//           </List>
//         </CardContent>
//       </Card>

//       <Card sx={{ mb: 3.75 }}>
//         <CardContent>
//           <Typography variant="h4" mb={0.5}>
//             Add Email
//           </Typography>
//           <Typography variant="body1" mb={2}>
//             This email can be used to recover password or to get notified along
//             with the primary email
//           </Typography>
//           <Box display="flex" alignItems="center" mt={1}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               size="small"
//               sx={{ mr: 2, width: 360, maxWidth: "100%" }}
//             />
//             <Button
//               variant="contained"
//               size="medium"
//               sx={{ flexShrink: 0, boxShadow: "none" }}
//             >
//               Add
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       <Card sx={{ mb: 3.75 }}>
//         <CardContent>
//           <FormGroup>
//             <FormControlLabel
//               control={<Checkbox defaultChecked />}
//               label={
//                 <Typography variant="body1" fontSize={15}>
//                   Keep my email addresses private
//                 </Typography>
//               }
//             />
//           </FormGroup>
//           <Typography variant={"body1"}>
//             We’ll remove your public profile email and use
//             abc-org@users.noreply.example.com for communication.
//           </Typography>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export { EmailAccessSettings };




import { useState } from "react";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import axios from "axios";
import { Stack, TextField, Typography, Modal, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { JumboForm } from "@jumbo/vendors/react-hook-form";
import { SettingHeader } from "@app/_components/user/settings";
import { Navigate } from "react-router-dom";

const EmailAccessSettings = () => {
  const [values, setValues] = useState({ newEmail: "", confirmEmail: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { userData,checkAuthentication } = useAuth();

  console.log("userData", userData);

  // Handle email change request
  const handleChangeEmail = async () => {
    const {  newEmail, confirmEmail } = values;
    if (!newEmail || !confirmEmail){
      alert("Enter All Field")
      return
    }


    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/change-email", {
        "old_email": userData.email,
        "new_email": newEmail,
        "confirm_email": confirmEmail,
      });

      console.log("response in email", response);
      if (response.data.status === 'success') {
        alert("Enter the verification code sent to your new email.");
        setModalOpen(true); // Open modal to enter verification code
      }else {
        alert(response.data.message)
      }
    } catch (err) {
      console.log("Error:", err);
      alert(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/verify-email-code", {
        "user_id": userData.user_id,
        "otp": verificationCode,
        "new_email": values.newEmail,
      });

      console.log("Verification response:", response.data);
      if (response.data.status === 'success') {
        alert("Email updated successfully!");
        checkAuthentication()
        setModalOpen(false);
      }else{
        alert(response.data.message)
      }
    } catch (err) {
      console.log("Verification Error:", err);
      alert(err.response?.data?.message || "Invalid code. Please try again.");
    }
  };

  return (
    <Div  sx={{ mb: 2 }}  style={{textAlign:"center"}}>
      <JumboCard contentWrapper>
        <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
          <Div >
            <Typography style={{marginBottom:20}} variant="h4">{"Update your Email"}</Typography>

            <JumboForm onSubmit={handleChangeEmail}>
              <Div
                sx={{
                  "& .MuiTextField-root": { mb: 2.5 },
                }}
              >
                {/* <TextField
                  fullWidth
                  label="Enter Your Old Email"
                  variant="outlined"
                  value={values.oldEmail}
                  onChange={(e) => setValues({ ...values, oldEmail: e.target.value })}
                /> */}
                <TextField
                  fullWidth
                  label="Enter Your New Email"
                  variant="outlined"
                  value={values.newEmail}
                  onChange={(e) => setValues({ ...values, newEmail: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Enter Your Confirm Email"
                  variant="outlined"
                  value={values.confirmEmail}
                  onChange={(e) => setValues({ ...values, confirmEmail: e.target.value })}
                />
                <LoadingButton type="submit" variant="contained" sx={{ boxShadow: "none", pt: 1 }}>
                  Update Email
                </LoadingButton>
              </Div>
            </JumboForm>
          </Div>
        </Stack>
      </JumboCard>
      

      {/* Modal for entering verification code */}
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enter Verification Code
          </Typography>
          <TextField
            fullWidth
            label="Verification Code"
            variant="outlined"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <LoadingButton
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleVerifyCode}
          >
            Verify & Update Email
          </LoadingButton>
        </Box>
      </Modal>
    </Div>
  );
};

export { EmailAccessSettings };
