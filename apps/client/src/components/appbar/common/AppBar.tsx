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
import {slideUpVariant} from "ui"
import { HideOnScroll } from "@/components/ui/animations/hideOnScroll";

 export const AppBar : React.FC= () => {
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  // admin and user authentication
  useEffect(() => {
    if (session.status === "authenticated") {
      if (session.data.user.role === "admin") {
        setAdminAuthenticated(true);
      } 
      else {
        setAdminAuthenticated(false)
        setUserAuthenticated(false)
      }
    }
  }, [session.status]);

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
              <motion.div initial="hidden" animate="visible" variants={slideUpVariant} transition={{ duration: 0.5 }}>
                <Button
                  onClick={() => router.push("/")}
                  sx={{
                    textTransform: "none",
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  <Typography variant="h5">CourseX</Typography>
                </Button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariant}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {adminAuthenticated ? <AdminAppBar /> : userAuthenticated ? <UserAppBar /> : <UnAuthenticatedAppBar />}
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </HideOnScroll>
  );
}
