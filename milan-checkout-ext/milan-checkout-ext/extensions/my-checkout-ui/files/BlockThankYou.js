import {
  BlockStack,
  Text,
  extension,
} from '@shopify/ui-extensions/checkout';

export default extension(
  'purchase.thank-you.block.render',
  (root, {shop, cost}) => {
    root.appendChild(
      root.createComponent(
        BlockStack,
        undefined,
        [
          root.createComponent(
            Text,
            undefined,
            `Block Thank You - Shop name: ${shop.name}`,
          ),
          root.createComponent(
            Text,
            undefined,
            `Block Thank You - Cost: ${cost.totalAmount}`,
          ),
        ],
      ),
    );
  },
);
