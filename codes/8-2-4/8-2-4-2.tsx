import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Page, Card, Link } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page title="Example app">
        <Card sectioned>
          <Link external url="https://example.com">
            Example Link
          </Link>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
