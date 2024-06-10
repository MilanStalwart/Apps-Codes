import {
  BlockStack,
  Text,
  extension,
} from '@shopify/ui-extensions/checkout';

export default extension(
  'purchase.checkout.header.render-after',
  (root, {shop, cost}) => {
    root.appendChild(
      root.createComponent(
        BlockStack,
        undefined,
        [
          root.createComponent(
            Text,
            undefined,
            `Header After - Shop name: ${shop.name}`,
          ),
          root.createComponent(
            Text,
            undefined,
            `Header After - Cost: ${cost.totalAmount}`,
          ),
        ],
      ),
    );
  },
);
