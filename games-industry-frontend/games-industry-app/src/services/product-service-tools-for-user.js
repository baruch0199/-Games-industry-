import httpService from "./httpService";
import { axiosPost } from "./httpService";
import { refresh } from "./usersSerivce";

export async function createProduct(product) {
  return await axiosPost("/create-product", product);
}

export async function getCartProducts() {
  const products = await httpService.get("/get-user-products");
  return products;
}

export async function buyProducts() {
  try {
    return await httpService.delete("/buy-products");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOne(productId) {
  try {
    await httpService.delete(`/delete-one-user-products/${productId}`);
  } catch (err) {
    console.log(err);
  }
}

const productServiceUser = {
  createProduct,
  getCartProducts,
  buyProducts,
  deleteOne,
};

export default productServiceUser;
