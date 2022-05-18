import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, Page } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Card title="Online store dashboard" sectioned>
          <p>View a summary of your online store’s performance.</p>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
