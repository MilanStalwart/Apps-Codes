import { BlockStack, reactExtension, TextBlock, Link, Banner } from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order-status.block.render",
  () => <PromotionBanner />
);

// [START order-status-block.build-ui]
function PromotionBanner() {
  return (
    <Banner>
      <BlockStack inlineAlignment="center" >
        <TextBlock>
          {`🎉 View you Wishlists and add more Snowboard   `}
          <Link to="extension:customer-account-react/">
            View rewards
          </Link>
        </TextBlock>
      </BlockStack>
    </Banner>
  );
}
// [END order-status-block.build-ui]