import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, List, Page } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Card
          title="Shipment 1234"
          secondaryFooterActions={[{ content: "Edit shipment" }]}
          primaryFooterAction={{ content: "Add tracking number" }}
        >
          <Card.Section title="Items">
            <List>
              <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
              <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
            </List>
          </Card.Section>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
