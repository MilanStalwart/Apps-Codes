import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";

const shopify = shopifyApi({
  // ASK: "4ccac5840c92849ffdd7cb05b378de9e",
  apiVersion: LATEST_API_VERSION,
  isCustomStoreApp: true,
  // AT: "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",
  isEmbeddedApp: false,
  hostName: "milan-r-dev.myshopify.com",
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");

// Get all products
const products = await shopify.rest.Product.all({
  fields: "id",
  session: session,
});
console.log("productsData", products.data);

// Fetch Single product Variants
const productsVariants = await shopify.rest.Variant.all({
  session: session,
  product_id: "8663301423396",
});
console.log("Single ProductVariant Id", productsVariants.data);

// Fetch the All Product Variants using ProductId
const getProductsAndVariants = async () => {
  try {
    const products = await shopify.rest.Product.all({ fields: "id", session });

    const productIds = products.data.map((product) => product.id);

    const variantPromises = productIds.map(async (productId) => {
      const variants = await shopify.rest.Variant.all({
        session,
        product_id: productId,
      });
      return variants.data;
    });

    const productsVariants = await Promise.all(variantPromises);

    console.log("Products Variants", JSON.stringify(productsVariants));
  } catch (error) {
    console.error("Error:", error.message);
  }
};
getProductsAndVariants();
