import { render } from "react-dom";
import { ShopifyProvider } from "@shopify/hydrogen/client";
import { shopifyConfig } from "./shopify.config";
import { ProductList } from "./ProductList";

export const App: React.FC = () => (
  <ShopifyProvider shopifyConfig={shopifyConfig}>
    <ProductList />
  </ShopifyProvider>
);

const renderApp = () => {
  const container = document.querySelector("#custom_storefront");
  if (container == null) return;
  render(<App />, container);
};

renderApp();
