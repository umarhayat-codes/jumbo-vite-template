// import { paymentCardData, PaymentMethods } from "@app/_components/common";
// import { JumboCard } from "@jumbo/components";
// import AddIcon from "@mui/icons-material/Add";
// import { Button, IconButton, Tooltip } from "@mui/material";
// import { SettingHeader } from "../../SettingHeader";

// const PaymentMethodSettings = () => {
//   return (
//     <>
//       <SettingHeader title={"Payment Methods"} divider sx={{ mb: 3 }} />
//       <JumboCard
//         title={"Payment Methods"}
//         subheader={"Add multiple payment methods you have"}
//         action={
//           <>
//             <Tooltip
//               title="Add Payment Method"
//               placement="top"
//               sx={{ display: { md: "none" } }}
//             >
//               <IconButton color="primary" size="small">
//                 <AddIcon />
//               </IconButton>
//             </Tooltip>
//             <Button
//               startIcon={<AddIcon />}
//               sx={{
//                 display: { xs: "none", md: "inline-flex" },
//                 textTransform: "none",
//                 letterSpacing: 0,
//                 "&:hover": { background: "transparent" },
//               }}
//               disableRipple
//             >
//               Add Payment Method
//             </Button>
//           </>
//         }
//         contentWrapper
//         sx={{
//           display: "flex",
//           minWidth: 0,
//           flexDirection: "column",
//           minHeight: "100%",
//         }}
//         contentSx={{ flex: 1, pt: 0 }}
//       >
//         <PaymentMethods data={paymentCardData} />
//       </JumboCard>
//     </>
//   );
// };

// export { PaymentMethodSettings };




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

const PaymentMethodSettings = () => {

  const {checkAuthentication,userData} = useAuth()
  const [values , setValues] = useState({newName: `${userData.name}`, newContact: `${userData.contact_no}` , dob : `${userData.dob}`,city:`${userData.address.city}`,state:`${userData.address.state}`,country:`${userData.address.country}` })

  console.log('userData', userData)

  const handleChangeProfile = async () => {
    const {newName,newContact,dob,city,state,country} = values   
    
    if (!newName || !newContact || !dob || !city || !state || !country) {
      alert("Please fill all field")
      return
    }
    if (newName.length < 3){
      alert("Please Enter Correct Name")
      return
    }
    if (newContact.length < 11) {
      alert("Please Enter Correct Contact No")
      return
    }
    if (newName.length < 3){
      alert("Please Enter Correct Name")
      return
    }
    if (city.length < 3 || state.length < 3 || country.length < 3) {
      alert("Please Enter Correct Address ")
      return
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/change-profile",
        { "new_name": newName,"new_contact": newContact, "dob" : dob ,"user_id": userData.user_id,"city":city,"state":state,"country":country}
      );
      console.log('response', response.data)
      if (response.data.status === 'success') {
        alert("Profile Successfully Change")
        checkAuthentication()
      }
    } catch (err) {
      console.log('err', err)
      alert(err.response?.data?.message || "Something went wrong. Try again.", "error");
    }
  };
  

  return (
    <Div sx={{ mb: 2 }} style={{textAlign:"center"}}>
      {/* <SettingHeader title={"Change Password"} divider sx={{ mb: 3 }} /> */}
      <JumboCard contentWrapper>
        <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        
          <Div>
            <Typography variant="h4" style={{marginBottom:20}}>{"Update your profile"}</Typography>


            <JumboForm onSubmit={handleChangeProfile}>
              <Div
                sx={{
                  "& .MuiTextField-root": {
                    mb: 2.5,
                  },
                }}
              >
                
                
                <TextField
                  fullWidth
                  label="Enter Your New Name"
                  variant="outlined"
                  value={values.newName}
                  onChange={(e) => setValues({ ...values, newName: e.target.value })}
                />

                 <TextField
                  fullWidth
                  label="Enter your New Contact"
                  variant="outlined"
                  value={values.newContact}
                  onChange={(e) => setValues({ ...values, newContact: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Enter your DOB"
                  variant="outlined"
                  value={values.dob}
                  type="date"
                  onChange={(e) => setValues({ ...values, dob: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Enter your city"
                  variant="outlined"
                  value={values.city}
                  onChange={(e) => setValues({ ...values, city: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Enter your State"
                  variant="outlined"
                  value={values.state}
                  onChange={(e) => setValues({ ...values, state: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Enter your Country"
                  variant="outlined"
                  value={values.country}
                  onChange={(e) => setValues({ ...values, country: e.target.value })}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ boxShadow: "none", pt: 1 }}
                >
                  Update Profile
                </LoadingButton>
              </Div>
            </JumboForm>
          </Div>
        </Stack>
      </JumboCard>
    </Div>
  );
};

export { PaymentMethodSettings };