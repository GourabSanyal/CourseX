import { motion } from 'framer-motion';
import { Typography, Box, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { Course } from 'shared-types';
import { useSession } from 'next-auth/react';


export const CourseMarquee = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/common/all-courses', {
          headers: {
            'x-request-source': 'marquee'
          }
        });
        setCourses(response.data.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId: string) => {
    if (session) {
      toast.info('Access all the courses from the dashboard');
    } else {
      toast.info('Please login to view course details');
    }
  };

  const renderSkeleton = () => (
    <Box sx={{ display: 'flex', gap: '2.5rem', padding: '1.5rem' }}>
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          sx={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            minWidth: '300px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={180} sx={{ mb: 2, borderRadius: '12px' }} />
          <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1.5, borderRadius: '8px' }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ borderRadius: '8px' }} />
        </Box>
      ))}
    </Box>
  );

  // Create a duplicated array of courses for seamless infinite scroll
  const duplicatedCourses = [...courses, ...courses, ...courses, ...courses, ...courses, ...courses, ...courses];

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        py: 2,
        mt: 2,
        position: 'relative',
      }}
    >
      {isLoading ? (
        renderSkeleton()
      ) : (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
            style={{
              display: 'flex',
              gap: '2.5rem',
              padding: '1.5rem',
              width: '200%',
            }}
          >
            {duplicatedCourses.map((course, index) => (
              <motion.div
                key={`${course._id}-${index}`}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCourseClick(course._id)}
                style={{
                  cursor: 'pointer',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  minWidth: '300px',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Box
                  component="img"
                  src={course.imageLink}
                  alt={course.title}
                  sx={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    mb: 2.5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1.5,
                    fontSize: '1.1rem',
                    lineHeight: 1.4,
                    color: 'text.primary',
                    minHeight: '3.5em',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {course.title}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  ₹{course.price}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </Box>
  );
}; 