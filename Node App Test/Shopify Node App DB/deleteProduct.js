import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";

const shopify = shopifyApi({
  apiSecretKey: "4ccac5840c92849ffdd7cb05b378de9e",
  apiVersion: LATEST_API_VERSION,
  isCustomStoreApp: true,
  adminApiAccessToken: "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",
  isEmbeddedApp: false,
  hostName: "milan-r-dev.myshopify.com",
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");

const deleteProduct = await shopify.rest.Product.delete({
  session: session,
  id: 8706516582692,
});

console.log("deleteVariant",deleteProduct.data)
