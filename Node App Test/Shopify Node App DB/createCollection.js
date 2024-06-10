import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";

const shopify = shopifyApi({
  // AKS: "4ccac5840c92849ffdd7cb05b378de9e",
  AV: LATEST_API_VERSION,
  isCustomStoreApp: true,
  aT: "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",
  isEmbeddedApp: false,
  hostName: "milan-r-dev.myshopify.com",
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com"); 

const smart_collection = new shopify.rest.SmartCollection({session: session});

smart_collection.id = 467587465508;
smart_collection.published = false;
await smart_collection.save({
  update: true,
});
console.log("collection unpublished")