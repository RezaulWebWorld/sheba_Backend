import { model, Schema } from "mongoose";
import { TData } from "./products.interface";

const productSchema = new Schema<TData>({
  Date: { type: Date, default: Date.now },
  Time: { type: Date, default: Date.now },
  Subject: String,
  Operator: String,
  Received_Amount: Number,
  Pay_to_Bank: Number,
  Pay_to_Company: Number,
  Pay_to_Agent: Number,
  Extra_Cost: Number,
  Total_Cost: Number,
  Total_Income: Number,
  Extra_Cost_Reason: Number,
});

export const productModel = model<TData>("Calculation", productSchema);
