import { Avatar, Box, Button, CircularProgress, Container, Grid, TextField } from '@mui/material'
import React from 'react'
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux/es/exports';

import { db } from '../firebase'

export default function Chat() {
  const [value, setValue] = React.useState('')
  const user = useSelector(({ user }) => user)

  const [messages, setMessages] = React.useState([])


  const fetchMessage = async () => {
    const data = []
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
    } catch (err) {
      console.log(err)
    }
    setMessages(data)
  }

  React.useEffect(() => {
    fetchMessage()
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        uid: user.uid,
        name: user.name,
        imgUrl: user.imgUrl,
        text: value,
        createDate: messages.length
      });
      setValue('')
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setValue(e)
    }
    fetchMessage()
  }

  if (!messages.length) {
    return <CircularProgress color="inherit" />
  }

  if (messages.length > 1) {
    return (
      <Container>
        <Grid container
          justify='center'
          sx={{ height: window.innerHeight - 50, marginTop: '20px' }}>
          <Box sx={{ width: '80%', height: '70vh', border: '1px solid red', overflowY: 'auto' }}>
            {
              messages.sort((a, b) => a.uid - b.uid).filter(obj => obj.imgUrl !== 'https://e7.pngegg.com/pngimages/349/288/png-clipart-teacher-education-student-course-school-avatar-child-face.png').map(obj => {
                return <div
                  style={{ margin: '10px', border: user.uid === obj.uid ? "5px solid green" : '2px solid black' }}
                  key={`${Math.random()}_userUid${user.uid}_name${user.name}`}
                >
                  <Avatar src={obj.imgUrl} /><span style={{ fontSize: '19px', fontWeight: '700' }}>{obj.name}</span>
                  <p style={{ fontSize: '16px', fontWeight: '500' }}>{obj.text}</p>
                </div>
              })
            }
          </Box>
          <Grid
            container
            direction='column'
            alignItems='flex-end'
            width='80%'
          >
            <form onSubmit={sendMessage} style={{ width: '100%' }}>
              <TextField variant='outlined' fullWidth maxRows={2} value={value} onChange={e => setValue(e.target.value)} />
              <Button onClick={sendMessage} variant='contained' type='submit'>send</Button>
            </form>
          </Grid>
        </Grid>
      </Container >
    )
  }

  return (
    <Container>
      <Grid container
        justify='center'
        sx={{ height: window.innerHeight - 50, marginTop: '20px' }}>
        <Box sx={{ width: '80%', height: '70vh', border: '1px solid red', overflowY: 'auto' }}>
          {
            messages.sort((a, b) => a - b).map(obj => {
              return <div
                style={{ margin: '10px', border: user.uid === obj.uid ? "5px solid green" : '2px solid black' }}
                key={`${Math.random()}_userUid${user.uid}_name${user.name}`}
              >
                <Avatar src={obj.imgUrl} /><span style={{ fontSize: '19px', fontWeight: '700' }}>{obj.name}</span>
                <p style={{ fontSize: '16px', fontWeight: '500' }}>{obj.text}</p>
              </div>
            })
          }
        </Box>
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          width='80%'
        >
          <form onSubmit={sendMessage} style={{ width: '100%' }}>
            <TextField variant='outlined' fullWidth maxRows={2} value={value} onChange={e => setValue(e.target.value)} />
            <Button onClick={sendMessage} variant='contained' type='submit'>send</Button>
          </form>
        </Grid>
      </Grid>
    </Container >
  )
}
