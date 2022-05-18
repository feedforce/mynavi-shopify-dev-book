import React from "react";
import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import PricingPlanPage from "./PricingPlanPage";

type Props = {
  apiKey: string;
  shopOrigin: string;
  host: string;
  debug: boolean;
};

const App: React.FC<Props> = ({ apiKey, shopOrigin, host, debug }) => (
  <PolarisProvider i18n={jaTranslations}>
    <AppBridgeProvider config={{ apiKey, host, forceRedirect: true }}>
      <PricingPlanPage />
    </AppBridgeProvider>
  </PolarisProvider>
);

export default App;
