import LoadingButton from "@mui/lab/LoadingButton";
import { validationSchema } from "../validation";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
// const [state,setState] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    const {name,email,password} = data
    if (!name || !email || !password) {
      alert("Please Enter All Field")
      return
    }
    if (name.length < 3) {
      alert("Please Enter name correct!")
      return
    }
    if (password.length < 5) {
      alert("Please Enter greater than 5")
      return
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/register", data);
      if (response.data.status === 'success') {
        alert(response.data.message)
        navigate('/auth/login-1')
      }
      else {
        alert(response.data.message)
        console.log('res.data.error', response.data.error)
        
      }

    } catch (error) {
      console.error("Signup Failed:", error.response?.data || error.message);
      console.log('error', error)
      alert("Signup Failed!");
    } finally {
      
    }
  };  

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onChange={() => {}}
    >
      <Stack spacing={3} mb={3}>
        <JumboInput fieldName={"name"} label={"Name"} defaultValue="Admin" />
        <JumboInput
          fullWidth
          fieldName={"email"}
          label={"Email"}
          defaultValue="admin@example.com"
        />
        <JumboOutlinedInput
          fieldName={"password"}
          label={"Password"}
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
          defaultValue="zab#723"
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        />
         <JumboInput
          fullWidth
          fieldName={"reference_id"}
          label={"Reference ID"}
          // defaultValue="admin@example.com"
        />
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          // loading={isSubmitting || mutation.isLoading}
        >
          Signup
        </LoadingButton>

      </Stack>
    </JumboForm>
  );
};

export { SignupForm };
