import { Backdrop, Box, Button, CircularProgress, TextField } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import { setUser } from '../redux/actions/user';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async () => {
    setOpen(true)
    const provider = new GoogleAuthProvider();
    const authGoogle = await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(setUser({ isUser: user.emailVerified, name: user.displayName, imgUrl: user.photoURL, uid: user.uid }))
        setOpen(false)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setOpen(false)
      })
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(setUser({ isUser: true, name: user.email, imgUrl: null, uid: user.uid }))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <Box height='90vh' display='flex' justifyContent='center' alignItems='center' bgcolor='#0A1929' flexDirection={'column-reverse'}>
      <Button variant='outlined' onClick={handleLogin} endIcon={<GoogleIcon />} color='warning'>Sign In With Google Accaunt</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleLogin}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleLoginWithEmail} style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '20px' }}>
        <TextField
          onChange={e => setEmail(e.target.value)}
          value={email}
          id="filled-hidden-label-normal"
          sx={{ backgroundColor: "white" }}
          variant="filled"
          type='email'
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="filled-hidden-label-normal"
          variant="filled"
          sx={{ backgroundColor: "white" }}
          type='password'
        />
        <Button variant='contained' type='submit'>Go chat</Button>
      </form>
    </Box>
  )
}
