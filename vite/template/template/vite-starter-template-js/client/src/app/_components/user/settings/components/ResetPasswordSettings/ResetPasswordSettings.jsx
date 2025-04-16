
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
// import { SettingHeader } from "../../SettingHeader";
import { SettingHeader } from "@app/_components/user/settings";
import { useState } from "react";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import axios from "axios";

const ResetPasswordSettings = () => {

  const [values , setValues] = useState({oldPassword:"", newPassword: ""})

  const {userData} = useAuth()
  console.log('userData', userData)
  const handleChangePassword = async () => {
    const {oldPassword,newPassword} = values    
    if (!oldPassword || !newPassword) {
      alert("Enter All Field!")
      return
    }
    if (newPassword.length < 5){
      alert("Enter Strong Password !")
      return
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/change-password",
        { "old_password": oldPassword,"new_password": newPassword, "id": userData.user_id}
      );
      console.log('response', response.data)
      if (response.data.status === "success") {
        alert("Password Successfully Change")
      }
      else{
        alert(response.data.message)
      }
    } catch (err) {
      console.log('err', err)
      alert(err.response?.data?.message || "Something went wrong. Try again.", "error");
    }
  };
  

  return (
    <Div sx={{ mb: 2 }}  style={{textAlign:"center"}}>
      {/* <SettingHeader title={"Change Password"} divider sx={{ mb: 3 }} /> */}
      <JumboCard contentWrapper>
        <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        
          <Div>
            <Typography style={{marginBottom:20}} variant="h4">{"Update your password"}</Typography>


            <JumboForm onSubmit={handleChangePassword}>
              <Div
                sx={{
                  "& .MuiTextField-root": {
                    mb: 2.5,
                  },
                }}
              >
                {/* <JumboInput
                  fieldName="currentPassword"
                  placeholder="Current Password"
                  size="small"
                  onChange={(e) => setValues({...values, currentPassword: e.target.value})}
                  fullWidth
                />
                <JumboInput
                  fieldName="newPassword"
                  placeholder="New Password"
                  size="small"
                  fullWidth
                />
                <JumboInput
                  fieldName="confirmPassword"
                  placeholder="Confirm Password"
                  size="small"
                  fullWidth
                /> */}
                
                <TextField
                  fullWidth
                  
                  label="Enter Your Old Password"
                  variant="outlined"
                  value={values.oldPassword}
                  onChange={(e) => setValues({ ...values, oldPassword: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Enter Your New Password"
                  variant="outlined"
                  value={values.newPassword}
                  onChange={(e) => setValues({ ...values, newPassword: e.target.value })}
                />
                
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ boxShadow: "none", pt: 1 }}
                >
                  Update Password
                </LoadingButton>
              </Div>
            </JumboForm>
          </Div>
        </Stack>
      </JumboCard>
    </Div>
  );
};

export { ResetPasswordSettings };