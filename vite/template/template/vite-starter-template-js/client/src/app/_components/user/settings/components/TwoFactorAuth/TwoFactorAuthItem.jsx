import {
  Button,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
const TwoFactorAuthItem = ({ auth }) => {
  return (
    <ListItem alignItems='flex-start'>
      {auth?.icon && (
        <ListItemAvatar sx={{ minWidth: '42px' }}>{auth.icon}</ListItemAvatar>
      )}
      <ListItemText
        primary={
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant='h5' fontWeight={500} sx={{ mb: 1 }}>
              {auth?.title}
            </Typography>
            {auth?.config && (
              <Chip
                label='configured'
                color='success'
                variant='outlined'
                size='small'
                sx={{ ml: 1, mb: 0.5 }}
              />
            )}
          </Stack>
        }
        secondary={auth?.subheader}
      />
      {auth?.config ? (
        <ListItemSecondaryAction>
          <Button variant='outlined' size='small'>
            Edit
          </Button>
        </ListItemSecondaryAction>
      ) : (
        <ListItemSecondaryAction>
          <Button variant='contained' size='small' disableElevation>
            Add
          </Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export { TwoFactorAuthItem };


// import { useAuth } from '@app/_components/_core/AuthProvider/hooks';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function TwoFactorAuthItem() {
//   const { userData } = useAuth(); 
//   const [qrCode, setQrCode] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   // Initialize enable state correctly from localStorage
//   const [enable, setEnable] = useState(() => {
//     return JSON.parse(localStorage.getItem("enable")) || false;
//   });

//   console.log('enable', enable);

//   // Sync enable state with localStorage
//   useEffect(() => {
//     localStorage.setItem("enable", JSON.stringify(enable));
//   }, [enable]);


  

//   const handleEnable2FA = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/two_factor/enable', {
//         userId: userData.user_id
//       });

//       console.log('response', response);
//       setQrCode(response.data.qr_code);
//       setEnable(true); // Update state
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Failed to enable 2FA:", error);
//     }
//   };

//   const handleDisable2FA = async () => {
//     try {
//       const res = await axios.post('http://127.0.0.1:8000/two_factor/dis-enable', {
//         userId: userData.user_id
//       });

//       alert(res.data.message);
//       setEnable(false); // Update state
//       setQrCode("");
//     } catch (error) {
//       console.error("Failed to disable 2FA:", error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   console.log('userData', userData);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Email: {userData.email}</h1>
//       <h1>User ID: {userData.user_id}</h1> 
      
//       {!enable ? (
//         <button onClick={handleEnable2FA} style={{ width: '100%', padding: '10px', margin: '10px 0' }}>
//           Enable 2FA
//         </button>
//       ) : (
//         <button onClick={handleDisable2FA} style={{ width: '100%', padding: '10px', margin: '10px 0' }}>
//           Disable 2FA
//         </button>
//       )}

//       {isModalOpen && (
//         <div style={modalStyles.overlay}>
//           <div style={modalStyles.modal}>
//             <h3>Scan this QR Code with Google Authenticator:</h3>
//             <img src={`data:image/png;base64,${qrCode}`} style={{ width: 200, height: 200 }} alt="QR Code" />
//             <button onClick={closeModal} style={{ marginTop: '10px', padding: '10px 20px' }}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // Basic modal styles
// const modalStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     textAlign: 'center',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//   },
// };  
// export { TwoFactorAuthItem };