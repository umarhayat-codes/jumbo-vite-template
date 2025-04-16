import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { validationSchema } from "../validation";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Link } from "@jumbo/shared";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ModelComponent from "./ModelComponent";

const LoginForm = () => {
  const { t } = useTranslation();
  const {setUser , isAuthenticated, setIsAuthenticated } = useAuth();
  const [enable, setEnable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const {checkAuthentication} = useAuth()
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  
  if (isAuthenticated === true && !openModal) {
    return <Navigate to="/" />
  }
  const handleLogin = async (data) => {
    console.log('data', data)
    const {email,password} = data
    if (!email || !password) {
      alert("Please fill all field")
      return
    }
    if (password.length < 3){
      alert("Please Enter Password greater than 3")
      return
    }
    setEmail(email)
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {"email": email,"password":password});
      console.log('response', response)
      
      setLoading(true); // Set loading to true when the API call starts
      console.log("token in login:", response.data.token);
      // const user = {"email":response.data.email,"user_id":response.data.user_id}
      
      
      setEnable(response.data.enable);
      if (response.data.enable) {
        setOpenModal(true);
        localStorage.setItem("enable",JSON.stringify(response.data.enable))
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);

      } else if (response.data.status === 'success') {

        localStorage.setItem("enable",JSON.stringify(response.data.enable))
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true)
        alert("Login Successful!");
        navigate('/dashboards/misc');
        checkAuthentication()
      }
      
      else {
        alert(response.data.message)      
    } 
  }catch (error) {
      console.error("Signin Failed:", error.response?.data || error.message);
      alert("Signin Failed!");
    } finally {
      setLoading(false); // Set loading to false when the API call completes
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/two_factor/verify-2fa", {
        email: email,
        code: code,
      });
      console.log('response', response)
      if (response.data.success) {
        navigate('/dashboards/misc');
        checkAuthentication()
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Verification Failed:", error);
      alert("Verification Failed!");
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <JumboForm
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        onChange={() => {}}
      >
        <Stack spacing={3} mb={3}>
          <JumboInput
            fullWidth
            fieldName={"email"}
            label={t("login.email")}
            defaultValue="demo@example.com"
          />
          <JumboOutlinedInput
            fieldName={"password"}
            label={t("login.password")}
            type={values.showPassword ? "text" : "password"}
            margin="none"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ bgcolor: (theme) => theme.palette.background.paper }}
            defaultValue={"zab#723"}
          />
          
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <JumboCheckbox
              fieldName="rememberMe"
              label={t("login.rememberMe")}
              defaultChecked
            />
            <Typography textAlign={"right"} variant={"body1"}>
              <Link underline="none" to={"/auth/forget-password"}>
                {t("login.forgotPassword")}
              </Link>
            </Typography>
          </Stack>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
          >
            {t("login.loggedIn")}
          </LoadingButton> 
        </Stack>
      </JumboForm>
      <ModelComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleVerifyCode}
      />
    </>
  );
};

export { LoginForm };

