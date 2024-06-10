import { extension, Text, InlineLayout, BlockStack, Divider, Image, Banner, Heading, Button, SkeletonImage, SkeletonText, } from "@shopify/ui-extensions/checkout";

export default extension( "purchase.checkout.block.render", (root, { lines, applyCartLinesChange, query, i18n, settings }) => {
    let products = [];
    let loading = true;
    let appRendered = false;

    fetchProducts(query).then((fetchedProducts) => {
      products = fetchedProducts;
      loading = false;
      renderApp();
    });

    lines.subscribe(() => renderApp());

    const loadingState = createLoadingState(root);
    if (loading) {
      root.appendChild(loadingState);
    }

    const { imageComponent, titleMarkup, priceMarkup, merchandise } = createProductComponents(root);
    const addButtonComponent = createAddButtonComponent( root, applyCartLinesChange, merchandise);

    const app = createApp( root, imageComponent, titleMarkup, priceMarkup, addButtonComponent );

    function renderApp() {
      if (loading) {
        return;
      }

      if (!loading && products.length === 0) {
        root.removeChild(loadingState);
        return;
      }

      const productsOnOffer = filterProductsOnOffer(lines, products);

      if (!loading && productsOnOffer.length === 0) {
        if (loadingState.parent) root.removeChild(loadingState);
        if (root.children) root.removeChild(root.children[0]);
        return;
      }

      updateProductComponents(
        productsOnOffer[0],
        imageComponent,
        titleMarkup,
        priceMarkup,
        addButtonComponent,
        merchandise,
        i18n
      );

      if (!appRendered) {
        root.removeChild(loadingState);
        root.appendChild(app);
        appRendered = true;
      }
    }

  // =================== custom checkout banner ===================

    const { status, collapsible } = settings.current;

    const title = settings.current.title ?? "Custom banner Test";
    const description = settings.current.description ?? "Custom banner description";
    const banner = root.createComponent(
      Banner,
      {
        title,
        status,
        collapsible,
      },
      description
    );

    settings.subscribe((newSettings) => {
      banner.updateProps({
        title: newSettings.title ?? "Custom banner Test",
        status: newSettings.status,
        collapsible: newSettings.collapsible,
      });
    });

    root.appendChild(banner);
  }
);

function fetchProducts(query) {
  return query(
    `query ($first: Int!) {
        products(first: $first) {
          nodes {
            id
            title
            images(first:1){
              nodes {
                url
              }
            }
            variants(first: 1) {
              nodes {
                id
                price {
                  amount
                }
              }
            }
          }
        }
      }`,
    {
      variables: { first: 5 },
    }
  )
    .then(({ data }) => data.products.nodes)
    .catch((err) => {
      console.error(err);
      return [];
    });
}
function createLoadingState(root) {
  return root.createComponent(BlockStack, { spacing: "loose" }, [
    root.createComponent(Divider),
    root.createComponent(Heading, { level: 2 }, ["You might also like"]),
    root.createComponent(BlockStack, { spacing: "loose" }, [
      root.createComponent(
        InlineLayout,
        {
          spacing: "base",
          columns: [64, "fill", "auto"],
          blockAlignment: "center",
        },
        [
          root.createComponent(SkeletonImage, { aspectRatio: 1 }),
          root.createComponent(BlockStack, { spacing: "none" }, [
            root.createComponent(SkeletonText, { inlineSize: "large" }),
            root.createComponent(SkeletonText, { inlineSize: "small" }),
          ]),
          root.createComponent(Button, { kind: "secondary", disabled: true }, [
            root.createText("Add Product"),
          ]),
        ]
      ),
    ]),
  ]);
}

function createProductComponents(root) {
  const imageComponent = root.createComponent(Image, {
    border: "base",
    borderWidth: "base",
    borderRadius: "loose",
    aspectRatio: 1,
    source: "",
  });
  const titleMarkup = root.createText("");
  const priceMarkup = root.createText("");
  const merchandise = { id: "" };

  return { imageComponent, titleMarkup, priceMarkup, merchandise };
}

function createAddButtonComponent(root, applyCartLinesChange, merchandise) {
  return root.createComponent(
    Button,
    {
      kind: "secondary",
      loading: false,
      onPress: async () => {
        await handleAddButtonPress(root, applyCartLinesChange, merchandise);
      },
    },
    ["Add Product"]
  );
}

async function handleAddButtonPress(root, applyCartLinesChange, merchandise) {
  console.log(merchandise);
  const result = await applyCartLinesChange({
    type: "addCartLine",
    merchandiseId: merchandise.id,
    quantity: 1,
  });

  if (result.type === "error") {
    displayErrorBanner(
      root,
      "There was an issue adding this product. Please try again."
    );
  }
}
function displayErrorBanner(root, message) {
  const errorComponent = root.createComponent(Banner, { status: "critical" }, [ message, ]);
  const topLevelComponent = root.children[0];
  topLevelComponent.appendChild(errorComponent);
  setTimeout(() => topLevelComponent.removeChild(errorComponent), 3000);
}
function createApp(
  root,
  imageComponent,
  titleMarkup,
  priceMarkup,
  addButtonComponent
) {
  return root.createComponent(BlockStack, { spacing: "loose" }, [
    root.createComponent(Divider),
    root.createComponent(Heading, { level: 2 }, "You might also like"),
    root.createComponent(BlockStack, { spacing: "loose" }, [
      root.createComponent(
        InlineLayout,
        {
          spacing: "base",
          columns: [100, "fill", "auto"],
          blockAlignment: "center",
        },
        [
          imageComponent,
          root.createComponent(BlockStack, { spacing: "none" }, [
            root.createComponent(Text, { size: "medium", emphasis: "strong" }, [
              titleMarkup,
            ]),
            root.createComponent(Text, { appearance: "subdued" }, [
              priceMarkup,
            ]),
          ]),
          addButtonComponent,
        ]
      ),
    ]),
    root.createComponent(Divider),
  ]);
}
function filterProductsOnOffer(lines, products) {
  const cartLineProductVariantIds = lines.current.map( (item) => item.merchandise.id );
  return products.filter((product) => {
    const isProductVariantInCart = product.variants.nodes.some(({ id }) =>
      cartLineProductVariantIds.includes(id)
    );
    return !isProductVariantInCart;
  });
}

function updateProductComponents( product, imageComponent, titleMarkup, priceMarkup, addButtonComponent, merchandise, i18n ) {
  const { images, title, variants } = product;
  console.log(product);

  const renderPrice = i18n.formatCurrency(variants.nodes[0].price.amount);

  const imageUrl = images.nodes[0]?.url ?? "https://cdn.shopify.com/s/files/1/0853/0578/6679/files/M-logo-removebg-preview.png?v=1704784372";

  imageComponent.updateProps({ source: imageUrl });
  titleMarkup.updateText(title);
  addButtonComponent.updateProps({ accessibilityLabel: `Add ${title} to cart,` });
  priceMarkup.updateText(renderPrice);
  merchandise.id = variants.nodes[0].id;
}
