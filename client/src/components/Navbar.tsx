import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isActive, setIsActive] = useState<String>("");

  useEffect(() => {
    if (window.location.pathname === "/validate-card") {
      setIsActive("validate-card");
    } else {
      setIsActive("home");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.5rem",
        marginLeft: "1rem",
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          fontSize: "1rem",
          border: "1px solid #f0f0f0",
          padding: "0.5rem",
          backgroundColor: isActive === "home" ? "#f0f0f0" : "",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          },
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/"
          onClick={() => setIsActive("home")}
        >
          Home
        </Link>
      </Box>
      <Box
        sx={{
          fontSize: "1rem",
          border: "1px solid #f0f0f0",
          padding: "0.5rem",
          backgroundColor: isActive === "validate-card" ? "#f0f0f0" : "",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          },
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "black",
          }}
          to="/validate-card"
          onClick={() => setIsActive("validate-card")}
        >
          Card Validator
        </Link>
      </Box>
    </Box>
  );
}
