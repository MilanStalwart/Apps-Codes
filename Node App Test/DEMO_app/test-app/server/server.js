import express from "express";
const app = express();
// Shopify Connection
import "@shopify/shopify-api/adapters/node";
import { shopifyApi } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
const shopify = shopifyApi({
  AK: "564787232f953504bf617e4975ff5fc6",
  ASK: "53076a6fbaa0eaf81e75f738eb0a557f",
  hostName: "2bd5-2401-4900-1c80-28ee-8411-8f92-ad2d-62ab.ngrok-free.app",
  adminApiAccessToken: "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",
  isCustomStoreApp: true,
  restResources,
});
const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");
const PORT = 80;

export { app, shopify, session, PORT, express }