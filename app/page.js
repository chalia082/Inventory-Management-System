'use client'
import { Box, Button, Modal, Stack, TextField, Typography, styled, alpha  } from "@mui/material";
import { collection, getDocs, getDoc, setDoc, deleteDoc, query, doc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';

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



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
          width: '20ch',
      },
  },
  },
}));

export default function Home() {

  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false);
  const [Itemname, setItemname] = useState([])
  const [searchQuery, setSearchQuery]= useState('')


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setItems(pantryList)
  }

  useEffect(() => {
    getItems()
  }, [])

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


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const itemsToShow = items.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  }) 

  return (
    <Box width="100vw" height="100vh" display={"flex"} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={2} > 
      
      {/* Search Bar starts */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
            >
                {/* <MenuIcon /> */}
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                Inventory
            </Typography>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                />
            </Search>
            </Toolbar>
        </AppBar>
      </Box>
      {/* Search Bar ends */}

      <Box position='absolute' display="flex" justifyContent="center" alignItems="center" flexDirection='column' gap={2}>
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
                onChange={(e) => {
                  const val = e.target.value
                  setItemname(val.charAt(0).toUpperCase() + val.slice(1))
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addItem(Itemname)
                    setItemname('')
                    handleClose()
                    console.log('here');
                    
                  }
                }} 
              />
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

        
        <Box border={'1px solid #333'} >
          <Box width='800px' height='100px' bgcolor="#89CFF0" display='flex' alignItems='center' justifyContent='center' >
            <Typography variant="h3" color={'#333'} textAlign={'center'} >
              Inventory Items
            </Typography>
          </Box>  

          <Stack width="800px" height="600px" spacing={2} overflow={'scroll'} >
            {itemsToShow.map((p) => (
              <Box key={p.name} width="100%" height="100px" display="flex" justifyContent='space-between' alignItems="center" bgcolor="#f0f0f0" paddingX={3} >
                <Typography variant="h4" color="#333" textAlign='center' gap={5} maxWidth={50} >
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                </Typography>
                <Typography
                  variant="h4"
                  color={"#333"}
                  textAlign={'left'}
                >
                  {p.quantity}
                </Typography>
                <Button 
                  onClick={() => deleteItems(p.name)}
                  variant="contained"
                  size="small"
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
