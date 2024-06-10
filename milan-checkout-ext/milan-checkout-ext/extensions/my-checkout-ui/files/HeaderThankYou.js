import {
  BlockStack,
  Text,
  extension,
} from '@shopify/ui-extensions/checkout';

export default extension( 'purchase.thank-you.header.render-after', (root, {shop, cost}) => {
    root.appendChild(
      root.createComponent(
        BlockStack,
        undefined,
        [
          root.createComponent(
            Text,
            undefined,
            `Header Thank You - Shop name: ${shop.name}`,
          ),
          root.createComponent(
            Text,
            undefined,
            `Header Thank You - Cost: ${cost.totalAmount}`,
          ),
        ],
      ),
    );
  },
);
