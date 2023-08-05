import { CreditCard } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { postCreditCard } from "../utils/apiService";

interface CardData {
  creditCardNumber: Number;
  expirationDate?: String;
  cvv?: Number;
}

export default function CreditForm() {
  const [cardDataState, setCardDataState] = useState<CardData>({
    creditCardNumber: 0,
    expirationDate: "08/27",
    cvv: 123,
  });
  const [message, setMessage] = useState<String>("");

  const handleSubmitCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postCreditCard(cardDataState);
    setMessage(res.message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCardDataState({
      ...cardDataState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          padding: "2rem",
          maxWidth: "700px",
        }}
      >
        {message && (
          <Alert
            sx={{
              marginBottom: "2rem",
            }}
            severity={
              message === "Valid credit card number" ? "success" : "error"
            }
          >
            {message}
          </Alert>
        )}
        <form
          onSubmit={handleSubmitCard}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            label="Credit Card Number"
            variant="outlined"
            name="creditCardNumber"
            fullWidth
            required
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreditCard />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <TextField
              label="Expiration Date"
              variant="outlined"
              type="text"
              value={cardDataState?.expirationDate}
              fullWidth
              name="expirationDate"
              disabled
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              name="cvv"
              disabled
              value={cardDataState?.cvv}
            />
          </Box>

          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              mt={2}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button variant="outlined" type="submit">
                Validate
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
}
