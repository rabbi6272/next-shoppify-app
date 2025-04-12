// cache.js
import NodeCache from "node-cache";

export const cache = new NodeCache();

export const cacheProducts = async (products) => {
  cache.set("products", products);
};

export const getProductsFromCache = async () => {
  return cache.get("products");
};
