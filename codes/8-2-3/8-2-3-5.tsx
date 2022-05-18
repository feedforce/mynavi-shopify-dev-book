import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, Layout, Page, TextStyle } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Layout>
          <Layout.Section oneHalf>
            <Card title="Florida" actions={[{ content: "Manage" }]}>
              <Card.Section>
                <TextStyle variation="subdued">455 units available</TextStyle>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title="Nevada" actions={[{ content: "Manage" }]}>
              <Card.Section>
                <TextStyle variation="subdued">301 units available</TextStyle>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
