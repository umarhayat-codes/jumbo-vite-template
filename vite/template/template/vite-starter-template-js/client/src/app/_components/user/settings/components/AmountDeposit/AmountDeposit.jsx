

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

const AmountDeposit = () => {

  const [values , setValues] = useState({amount:""})
  const [amount,setAmount] = useState(0)
  const {userData,checkAuthentication} = useAuth()
  console.log('userData', userData)
  const handleChangeAmount = async () => {
    const {amount} = values   
    // console.log('values', values) 
    
    if (!amount) {
      console.log("You entered a valid number:");
      return
  } 
  
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/amount/deposit",
        { "amount": amount, "user_id": userData.user_id}
      );
      console.log('response', response.data)
      if (response.data.status === "success") {
        alert(response.data.message)
        
        checkAuthentication()
        setAmount(response.data.new_amount)
        console.log('amount', amount)
        
      }
      else{
        alert(response.data.message)
      }
    } catch (err) {
      console.log('err', err)
      alert(err.response?.data?.message || "Something went wrong. Try again.", "error");
    }
  };
  
console.log('amount', amount)
  return (
    <>
    
    <h4>Your Amount: {userData?.amount} </h4>
    <Div sx={{ mb: 2 }}  style={{textAlign:"center"}}>
      {/* <SettingHeader title={"Change Password"} divider sx={{ mb: 3 }} /> */}
      <JumboCard contentWrapper>
        <Stack spacing={3} direction={{ xs: "column" }}>
        
          <Div>
            <Typography style={{marginBottom:20}} variant="h4">{"Deposit Amount"}</Typography>


            <JumboForm onSubmit={handleChangeAmount}>
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
                  
                  label="Enter Your Amount"
                  variant="outlined"
                  value={values.amount}
                  onChange={(e) => setValues({ ...values, amount: e.target.value })}
                />

                {/* <TextField
                  fullWidth
                  label="Enter Your New Password"
                  variant="outlined"
                  value={values.newPassword}
                  onChange={(e) => setValues({ ...values, newPassword: e.target.value })}
                /> */}
                
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ boxShadow: "none", pt: 1 }}
                >
                  Deposit Amount
                </LoadingButton>
              </Div>
            </JumboForm>
          </Div>
        </Stack>
      </JumboCard>
    </Div>
    </>
  );
};

export { AmountDeposit };