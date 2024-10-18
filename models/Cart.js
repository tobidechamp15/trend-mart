import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const itemSchema = new Schema(
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
      min: 1, // Ensure quantity is at least 1
    },
    price: {
      type: Number,
      required: true, // Ensure price is required
      min: 0, // Ensure price cannot be negative
    },
  },
  { _id: false },
); // Disable auto-generating an _id for items

const cartSchema = new Schema({
  items: [itemSchema],
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email corresponds to a unique cart
    trim: true, // Automatically trim whitespace
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

// Middleware to update `updatedAt` on save
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure compatibility with server-side rendering in Next.js 13
const Cart = models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
