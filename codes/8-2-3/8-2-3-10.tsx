import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, List, Page } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Card title="Staff accounts">
          <Card.Section>Felix Crafford</Card.Section>
          <Card.Section subdued title="Deactivated staff accounts">
            Ezequiel Manno
          </Card.Section>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
