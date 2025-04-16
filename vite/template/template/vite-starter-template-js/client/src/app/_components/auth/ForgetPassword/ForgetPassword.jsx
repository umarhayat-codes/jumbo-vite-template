import { useState, useEffect } from "react";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div } from "@jumbo/shared";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  
} from "@mui/material";
import axios from "axios";
import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";

const ForgotPasswordForm = () => {
  const { User } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

 

  const showToast = (message, type = "success") => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: type === "success" ? "#4caf50" : "#f44336",
        color: "#fff",
      },
    }).showToast();
  };
  
  
  const handleRequestOtp = async (data) => {
    console.log('data', data)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/forgot-password",
        { email: data.email }
      );
      console.log('response', response.data)
      if (response.status === 200) {
        localStorage.setItem("userId", response.data.user_id);
        setIsModalOpen(true);
        setOtp("");
  
        alert("OTP sent successfully!", "success");
      }
    } catch (err) {
      console.log('err', err)
      alert(err.response?.data?.message || "Something went wrong. Try again.", "error");
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      const id = localStorage.getItem("userId");
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/verify-code",
        { otp, id }
      );

      if (response.status === 200) {
        setIsModalOpen(false); // Close OTP modal
        setIsOtpVerified(true); // Open password reset modal
        alert("OTP verified successfully!", "success");
      } else {
        alert("Invalid OTP. Try again.", "error");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to verify OTP.", "error");
    }
};

  
  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setPasswordError("");
  
    try {
      const id = localStorage.getItem("userId");
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/reset-password`,
        { "new_password": password ,"id":id}
      );
  
      if (response.status === 200) {
        alert("Password updated successfully!", "success");
        setIsModalOpen(false);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    }
  };


  return (
    <Div
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", mb: 4 }}>
        
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Forgot Password
          </Typography>
          <JumboForm onSubmit={handleRequestOtp}>
            <Stack spacing={3} mb={3}>
              <JumboInput
                fieldName="email"
                label="Email"
                rules={{ required: "Email is required" }}
              />
              <LoadingButton type="submit" variant="contained" size="large">
                Send OTP
              </LoadingButton>
            </Stack>
          </JumboForm>
        </CardContent>
      </Card>

      {/* OTP Verification Modal */}
<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
    <Typography variant="h6" mb={2}>
      Verify OTP
    </Typography>
    <TextField
      fullWidth
      label="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      margin="normal"
    />
    <LoadingButton
      fullWidth
      variant="contained"
      color="primary"
      onClick={handleVerifyOtp}
      sx={{ mt: 2 }}
    >
      Verify OTP
    </LoadingButton>
  </Box>
</Modal>

{/* Password Reset Modal */}
<Modal open={isOtpVerified} onClose={() => setIsOtpVerified(false)}>
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
    <Typography variant="h6" mb={2}>
      Change Password
    </Typography>
    <TextField
      fullWidth
      label="New Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      margin="normal"
    />
    <LoadingButton
      fullWidth
      variant="contained"
      color="primary"
      onClick={handleUpdatePassword}
      sx={{ mt: 2 }}
    >
      Update Password
    </LoadingButton>
  </Box>
</Modal>

    </Div>
  );
};

export default ForgotPasswordForm;




