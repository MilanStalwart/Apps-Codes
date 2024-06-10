import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";

const shopify = shopifyApi({
  apiSecretKey: "4ccac5840c92849ffdd7cb05b378de9e", // Note: this is the API Secret Key, NOT the API access token
  apiVersion: LATEST_API_VERSION,
  isCustomStoreApp: true, // this MUST be set to true (default is false)
  adminApiAccessToken: "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", // Note: this is the API access token, NOT the API Secret Key
  isEmbeddedApp: false,
  hostName: "milan-r-dev.myshopify.com",
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com"); 

const product = new shopify.rest.Product({session: session});
product.id = 8663302144292;
product.images = [
  {
    src: 'https://cdn.shopify.com/s/files/1/0816/2535/0436/files/M-logo-removebg-preview_74ccc615-3ad8-49cb-85c5-8213d0da405a.png?v=1702037414'
  }
]
await product.save({
  update: true,
});
console.log(product.data)