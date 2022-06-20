import { Backdrop, Box, Button, CircularProgress } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import { setUser } from '../redux/actions/user';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)

  const handleLogin = async () => {
    setOpen(true)
    const provider = new GoogleAuthProvider();
    const authGoogle = await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(setUser({ isUser: user.emailVerified, name: user.displayName, imgUrl: user.photoURL , uid: user.uid}))
        setOpen(false)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setOpen(false)
      })
  }

  return (
    <Box height='90vh' display='flex' justifyContent='center' alignItems='center' bgcolor='#0A1929'>
      <Button variant='outlined' onClick={handleLogin} endIcon={<GoogleIcon />} color='warning'>Sign In With Google Accaunt</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleLogin}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
