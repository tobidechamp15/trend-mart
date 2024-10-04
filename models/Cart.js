import mongoose from "mongoose";

const { Schema, models } = mongoose;

const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that each email corresponds to a unique cart
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure compatibility with server-side rendering in Next.js 13
const Cart = models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
