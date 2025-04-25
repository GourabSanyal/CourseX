import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { CourseMarquee } from '../components/course-marquee/CourseMarquee';
import { Footer } from '../components/footer/Footer';
import { useLoginModal } from '@/hooks/useLoginModal';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { openLoginModal } = useLoginModal();

  const session = useSession();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: { xs: 8, sm: 12, md: 16 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            mb: { xs: 1, sm: 1, md: 1 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 'bold',
                mb: { xs: 2, sm: 3, md: 4 },
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              Transform Your Future
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                mb: { xs: 4, sm: 5, md: 6 },
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              Master in-demand skills with expert-led courses
            </Typography>
          </motion.div>
              
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {!session && (
              <Button
                variant="contained"
                size="large"
                onClick={openLoginModal}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0,118,255,0.23)',
                  },
                }}
              >
                Start Learning Today
              </Button>
            )}
          </motion.div>
        </Box>

        <Box sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
          <CourseMarquee />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
