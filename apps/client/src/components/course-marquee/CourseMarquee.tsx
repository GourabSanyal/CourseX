import { motion } from 'framer-motion';
import { Typography, Box, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
}

export const CourseMarquee = () => {
  const router = useRouter();
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
    toast.info('Please login to view course details');
  };

  const renderSkeleton = () => (
    <Box sx={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          sx={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '250px',
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" height={20} />
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
        py: 1,
        mt: 1,
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
                duration: 10,
                ease: 'linear',
              },
            }}
            style={{
              display: 'flex',
              gap: '2rem',
              padding: '1rem',
              width: '200%',
            }}
          >
            {duplicatedCourses.map((course, index) => (
              <motion.div
                key={`${course._id}-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCourseClick(course._id)}
                style={{
                  cursor: 'pointer',
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  minWidth: '250px',
                }}
              >
                <Box
                  component="img"
                  src={course.imageLink}
                  alt={course.title}
                  sx={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {course.title}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {course.description.substring(0, 100)}...
                </Typography> */}
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
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