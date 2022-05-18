import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider } from "@shopify/polaris";

function App() {
  return <AppProvider i18n={jaTranslations}></AppProvider>;
}
