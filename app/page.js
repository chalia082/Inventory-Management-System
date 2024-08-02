'use client'
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, getDocs, getDoc, setDoc, deleteDoc, query, doc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Itemname, setItemname] = useState([])

  const getItems = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    console.log(pantryList);
    setPantry(pantryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }
    await getItems()
  }

  const deleteItems = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await getItems()
  }


  useEffect(() => {
    getItems()
  }, [])

  

  return (
    <Box 
      width="100vw" 
      height="100vh"
      display={"flex"}
      justifyContent={'center'}
      alignItems={'center'}  
      flexDirection={'column'}
      gap={2}
    > 
      <Button variant="contained" onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add an item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2} >
            <TextField 
              id="outlined-basic" 
              label="Item" 
              variant="outlined" 
              fullWidth 
              value={Itemname}
              onChange={(e) => setItemname(e.target.value)} />
            <Button variant="outlined" onClick={() => {
                addItem(Itemname)
                setItemname('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      
      <Box border={'1px solid #333'}>
        <Box width='800px' height='100px' bgcolor="#89CFF0" display='flex' alignItems='center' justifyContent='center' >
          <Typography 
            variant="h3" 
            color={'#333'} 
            textAlign={'center'}
          >
            Pantry Items
          </Typography>
      </Box>  
        <Stack 
          width="800px"
          height="400px"
          spacing={2}
          overflow={'scroll'}
        >
          {pantry.map((p) => (
            <Box key={p.name} width="100%" height="70px" display="flex" justifyContent='space-between' alignItems='center' bgcolor="#f0f0f0" paddingX="2" >
              <Typography variant="h4" color="#333" textAlign='center' >
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </Typography>
              <Typography
                variant="h4"
                color={"#333"}
                textAlign={'center'}
              >
                {p.quantity}
              </Typography>
              <Button 
                onClick={() => deleteItems(p.name)}
                variant="contained"
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
