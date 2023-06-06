const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "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"
);

app.post("/checkout", async (req, res) => {
  const { id, amount } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://localhost:4242/success.html",
      cancel_url: "https://localhost:4242/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
    return res.status(400).json({
      message: error.message,
    });
  }
});

app.listen(4242, () => console.log("Running on port 4242"));
