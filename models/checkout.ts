import mongoose, { Schema, Document, Model, model } from "mongoose"
const GUID = require('mongoose-guid');

export interface ICheckout extends Document {
  id: string;
  name: string;
  date: Date;
  products: {
    productId : String,
    unitPrice: Number,
    quantity: Number,
    subtotal: Number
  } [],
  total: Number,
  paymentAmount: Number,
  paymentMethod: String
}

export const CheckoutSchema: Schema = new Schema({
  id: {
    type: GUID.type,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
  },
  products: [{
    productId : String,
    unitPrice: Number,
    quantity: Number,
    subtotal: Number
  }],
  total: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  paymentAmount: {
    type: Number,
  },
  paymentMethod:{
    type: String
  }
});

const Checkout: Model<ICheckout> = model<ICheckout>("Checkout", CheckoutSchema);
module.exports = Checkout;
