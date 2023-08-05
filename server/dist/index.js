"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, cors_1.default)());
app.post("/api/validate", (req, res) => {
    const { creditCardNumber } = req.body;
    const addTwoDigits = (num) => {
        // if it is, subtract 9 from the result
        let digitOne = num.toString().split("")[0];
        let digitTwo = num.toString().split("")[1];
        return parseInt(digitOne) + parseInt(digitTwo);
    };
    // creating the Luhn algorithm to validate the credit card number
    const LuhnAlgo = (cardNumber) => {
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
                }
                else {
                    currentDigit = currentDigit;
                    // console.log(currentDigit, 'current digit * 2');
                }
                totalSum += currentDigit;
            }
            else {
                // multiply the second digit by 1
                currentDigit = currentDigit * 1;
                // check if the result is a double digit
                if (currentDigit.toString().length > 1) {
                    //  console.log(currentDigit, 'current digit (double) * 1');
                    currentDigit = addTwoDigits(currentDigit);
                }
                else {
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
    }
    else {
        res.json({
            status: 400,
            message: "Invalid credit card number",
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
