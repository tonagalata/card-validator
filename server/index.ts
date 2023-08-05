import express, { Request, Response } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 9000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.post("/api/validate", (req: Request, res: Response) => {
  const { creditCardNumber } = req.body;

  const addTwoDigits = (num: number) => {
    // if it is, subtract 9 from the result
    let digitOne = num.toString().split("")[0];
    let digitTwo = num.toString().split("")[1];

    return parseInt(digitOne) + parseInt(digitTwo);
  };

  // creating the Luhn algorithm to validate the credit card number
  const LuhnAlgo = (cardNumber: string) => {
    let totalSum = 0;

    for (let i = 0; i < cardNumber.length; i++) {
      let currentDigit = parseInt(cardNumber[i]);
      // weighted pattern is 2, 1, 2, 1...
      if (i % 2 === 0 || i === 0) {
        // multiply the first digit by 2
        currentDigit = currentDigit * 2;

        // check if the result is a double digit
        if (currentDigit.toString().length > 1) {
          // console.log(currentDigit, 'current digit (double) * 2');
          currentDigit = addTwoDigits(currentDigit);
        } else {
          currentDigit = currentDigit;
          // console.log(currentDigit, 'current digit * 2');
        }

        totalSum += currentDigit;
      } else {
        // multiply the second digit by 1
        currentDigit = currentDigit * 1;

        // check if the result is a double digit
        if (currentDigit.toString().length > 1) {
          //  console.log(currentDigit, 'current digit (double) * 1');
          currentDigit = addTwoDigits(currentDigit);
        } else {
          currentDigit = currentDigit;
          //  console.log(currentDigit, 'current digit * 1');
        }

        totalSum += currentDigit;
      }
    }
    // console.log(totalSum);
    return totalSum % 10 === 0 ? true : false;
  };

  //   console.log(LuhnAlgo(creditCardNumber), "LuhnAlgo(creditCardNumber)");

  if (LuhnAlgo(creditCardNumber)) {
    res.json({
      status: 200,
      message: "Valid credit card number",
    });
  } else {
    res.json({
      status: 400,
      message: "Invalid credit card number",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
