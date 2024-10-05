const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
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
      totalItemPrice: {
        type: Number,
        required: true, // Calculate based on quantity * price
      },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email corresponds to a unique cart
  },
  totalPrice: {
    type: Number,
    required: true, // Store total price of all items in the cart
    default: 0,
  },
  discount: {
    type: Number,
    default: 0, // Store any discount applied to the cart
  },
  couponCode: {
    type: String,
    default: null, // Store coupon code if any
  },
  status: {
    type: String,
    enum: ["active", "abandoned", "completed"],
    default: "active", // Track cart status
  },
  currency: {
    type: String,
    default: "USD", // Default currency for cart
  },
  shippingCost: {
    type: Number,
    default: 0, // Optional: store shipping cost if applicable
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
const Cart = models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
