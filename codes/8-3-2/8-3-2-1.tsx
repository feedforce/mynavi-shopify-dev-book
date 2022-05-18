import React from "react";
import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";

type Props = {
  apiKey: string;
  host: string;
};

const App: React.FC<Props> = ({ apiKey, host }) => {
  return (
    <PolarisProvider i18n={jaTranslations}>
      <AppBridgeProvider config={{ apiKey, host, forceRedirect: true }}>
        {/* some contents */}
      </AppBridgeProvider>
    </PolarisProvider>
  );
};

export default App;
