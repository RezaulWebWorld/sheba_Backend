import { Date, ObjectId } from "mongoose";

export type TData = {
  Date: Date;
  Time: Date;
  Subject: string;
  Operator: string;
  Received_Amount: number;
  Pay_to_Bank: number;
  Pay_to_Company: number;
  Pay_to_Agent: number;
  Extra_Cost: number;
  Total_Cost: number;
  Total_Income: number;
  Extra_Cost_Reason: string;
};
