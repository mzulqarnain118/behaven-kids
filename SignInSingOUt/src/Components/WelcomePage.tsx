import React, { useState, useEffect } from "react";
import { Container, Typography, Slide, Card, CardContent } from "@mui/material";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  firstName: string;
}

export default function WelcomePage() {
  const [firstName, setFirstName] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token) as DecodedToken;
      setFirstName(decoded?.unique_name || "");
    }
    setShowWelcome(true);
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Slide direction="left" in={showWelcome} mountOnEnter unmountOnExit>
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            width: "100%",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.5)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                marginBottom: "20px",
                color: "#1a237e",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#3f51b5",
                },
              }}
            >
              Welcome to Behaven Kids
            </Typography>
            {firstName && (
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  marginBottom: "30px",
                  color: "#303f9f",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#5c6bc0",
                  },
                }}
              >
                Hello, {firstName}!
              </Typography>
            )}
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "italic",
                color: "#3949ab",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#7986cb",
                },
              }}
            >
              Building Hope Through Mental Wellness
            </Typography>
          </CardContent>
        </Card>
      </Slide>
    </Container>
  );
}
