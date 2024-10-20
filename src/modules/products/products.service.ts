import mongoose from "mongoose";
import { TData } from "./products.interface";
import { productModel } from "./products.model";

//  Service for creating product
const createProduct = async (payload: TData) => {
  const products = await productModel.create(payload);
  return products;
};

//  Service for getting all Product
const getAllProducts = async () => {
  const allProducts = await productModel
    .find({ isDeleted: false })
    .sort({ createdAt: -1 });
  return allProducts;
};
//  Service for getting all Product
const getFeaturedProduct = async () => {
  const featuredProduct = await productModel
    .find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(6);
  return featuredProduct;
};

//  Service for updating  Product info
// const updateProductInfo = async (id: string, payloads: Partial<TData>) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const product = await productModel.findById(id);
//     if (!product) {
//       throw new Error("There is no Id");
//     }

//     if (payloads.title !== undefined) {
//       product.title = payloads.title;
//     }
//     if (payloads.price !== undefined) {
//       product.price = payloads.price;
//     }
//     if (payloads.brand !== undefined) {
//       product.brand = payloads.brand;
//     }

//     console.log("Payloads", payloads);
//     console.log("Products", product);
//     const updatedProducts = await productModel.findByIdAndUpdate(id, product, {
//       new: true,
//       upsert: true,
//       runValidators: true,
//       session,
//     });
//     await session.commitTransaction();
//     await session.endSession();
//     console.log(updatedProducts);
//     return updatedProducts;
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error("Failed to Update");
//   }
// };
//  Service for Delete  product by id
const deletingProduct = async (_id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const bookingId = await productModel.findOne({ _id });
    const deleted = await productModel.findOne({ isDeleted: true });
    if (deleted) {
      throw new Error("The Booking is Already Deleted");
    }
    if (!bookingId) {
      throw new Error(" No Booking found to Delete");
    }

    const result = await productModel.findByIdAndUpdate(
      bookingId,
      { isDeleted: true },
      { new: true, session }
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to Delete");
  }
};

export const productService = {
  createProduct,
  getAllProducts,
  deletingProduct,
  getFeaturedProduct,
};
