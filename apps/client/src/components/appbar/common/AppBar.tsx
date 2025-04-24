import React from "react";
import {
  AppBar as MuiAppBar,
  Button,
  Toolbar,
  Typography,
  Container,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UnAuthenticatedAppBar from "./UnAuthenticatedAppBar";
import AdminAppBar from "../admin/AdminAppBar";
import UserAppBar from "../user/UserAppBar";
import { motion } from "framer-motion";
import { slideUpVariant } from "ui";
import { HideOnScroll } from "@/components/ui/animations/hideOnScroll";

export const AppBar: React.FC = () => {
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Handle authentication state
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "admin") {
        setAdminAuthenticated(true);
        setUserAuthenticated(false);
      } else if (session.user.role === "user") {
        setUserAuthenticated(true);
        setAdminAuthenticated(false);
      }
    } else {
      setAdminAuthenticated(false);
      setUserAuthenticated(false);
    }
  }, [session, status]);

  return (
    <HideOnScroll>
      <MuiAppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariant}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={() => router.push("/")}
                  sx={{
                    textTransform: "none",
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
                    }}
                  >
                    CourseX
                  </Typography>
                </Button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariant}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {adminAuthenticated ? (
                  <AdminAppBar />
                ) : userAuthenticated ? (
                  <UserAppBar />
                ) : (
                  <UnAuthenticatedAppBar />
                )}
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </HideOnScroll>
  );
};
