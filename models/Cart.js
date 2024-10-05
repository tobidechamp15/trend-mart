import mongoose from 'mongoose';
const { Schema, models } = mongoose;

const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      itemName: {
        type: String, // Store the name of the product
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true, // Ensure price is required
      },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email corresponds to a unique cart
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically track when cart is updated
  },
});

// Ensure compatibility with server-side rendering in Next.js 13
const Cart = models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
