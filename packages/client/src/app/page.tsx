'use client'
import React from 'react'
import { Button, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { signIn } from 'next-auth/react'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const LandingPage: React.FC = () => {
  return (
    <StyledContainer>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Debt Splitter
        </Typography>
        <Typography variant="body1" gutterBottom>
          The best app for managing and splitting your expenses.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => signIn('google')}>
          Login with Google
        </Button>
      </motion.div>
    </StyledContainer>
  )
}

export default LandingPage


// const Home: React.FC = () => {
//   return (
//     <main>
//       <WebsocketsProvider>
//         <ThemeProvider>
//           <AppProvider>
//             <Button variant="contained" color="primary" onClick={() => signIn('google')}>
//               Login with Google
//             </Button>
//             <Layout />
//           </AppProvider>
//         </ThemeProvider>
//       </WebsocketsProvider>
//     </main>
//   )
// }
//
// export default Home
