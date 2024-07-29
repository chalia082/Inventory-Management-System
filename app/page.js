import { Box, Stack, Typography } from "@mui/material";

const items = ['tomato', 'potato', 'onion', 'garlic', 'ginger', 'chicken', 'beef', 'pork', 'fish', 'milk', 'egg', 'butter', 'cheese', 'yogurt', 'bread', 'rice', 'pasta', 'flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar', 'soy sauce', 'ketchup', 'mustard', 'mayonnaise', 'honey', 'jam', 'peanut butter', 'coffee', 'tea', 'juice', 'soda', 'beer', 'wine', 'whiskey', 'vodka']


export default function Home() {
  return (
    <Box 
      width="100vw" 
      height="100vh"
      display={"flex"}
      justifyContent={'center'}
      alignItems={'center'}  
      flexDirection={'column'}
    >
      <Box 
        width={'800px'} 
        height={'100px'} 
        bgcolor={"#89CFF0"} 
        display={'flex'} 
        justifyContent={'center'} 
        alignContent={'center'}
        border={'1px solid #333'}
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
        {items.map((i) => (
          <Box 
            key={i}
            width={"100%"}
            height={"100px"}
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
                i.charAt(0).toUpperCase() + i.slice(1)
              }
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
