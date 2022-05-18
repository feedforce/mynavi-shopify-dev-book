import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, Page } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Card>
          <Card.Header title="Online store dashboard" />
          <Card.Section>
            <p>View a summary of your online store’s performance.</p>
          </Card.Section>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
