import { reactExtension, Link, Card, InlineStack, Text } from '@shopify/ui-extensions-react/customer-account';

// [START block.build-ui]
export default reactExtension(
  'customer-account.profile.block.render',
    () => <BlockExtension />
);

function BlockExtension() {
  return (
    <Card padding>
      <InlineStack inlineAlignment="center" spacing="tight">
        <Text>Slide with more snowboard from your wishlist.</Text>
        <Link to="extension:customer-account-react/">View wishlist</Link>
      </InlineStack>
    </Card>
  );
}