'use client'
import { Box, Stack, Typography } from "@mui/material";
import { collection, getDocs, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";


// const item = ['tomato', 'potato', 'onion', 'garlic', 'ginger', 'chicken', 'beef', 'pork', 'fish', 'milk', 'egg', 'butter', 'cheese', 'yogurt', 'bread', 'rice', 'pasta', 'flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar', 'soy sauce', 'ketchup', 'mustard', 'mayonnaise', 'honey', 'jam', 'peanut butter', 'coffee', 'tea', 'juice', 'soda', 'beer', 'wine', 'whiskey', 'vodka']


export default function Home() {
  const [pantry, setPantry] = useState([])

  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'))
      const docs = await getDocs(snapshot)
      const pantryList = []
      docs.forEach((doc) => {
        console.log(doc.id, doc.data());
        pantryList.push(doc)
      })
      console.log(pantryList);
      setPantry(pantryList)
    }
    updatePantry()
  }, [])

  return (
    <Box 
      width="100vw" 
      height="100vh"
      display={"flex"}
      justifyContent={'center'}
      alignItems={'center'}  
      flexDirection={'column'}
    >
      <Box border={'1px solid #333'}>
        <Box 
          width={'800px'} 
          height={'100px'} 
          bgcolor={"#89CFF0"} 
          display={'flex'} 
          justifyContent={'center'} 
          alignContent={'center'} 
        >
          <Typography 
            variant="h2" 
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
            <Box 
              key={i}
              width={"100%"}
              height={"70px"}
              display={"flex"}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={"#f0f0f0"}
            >  
              <Typography
                variant="h3"
                color={"#333"}
                textAlign={'center'}
              >
                {
                  p.charAt(0).toUpperCase() + p.slice(1)
                }
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
