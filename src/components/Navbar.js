import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export default function Navbar() {
  const user = useSelector(({ user }) => user)
  return (
    <AppBar position="static">
      <Toolbar>
        {user.isUser &&
          <Avatar alt="Remy Sharp" src={`${user.imgUrl}`} sx={{ marginRight: '10px' }} />
        }
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user.name}
        </Typography>
        {user.isUser
          ? <Button color="inherit" endIcon={<LogoutIcon />} onClick={() => window.location.reload()}>logout</Button>
          : <Button color="inherit" endIcon={<LoginIcon />}>login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}
