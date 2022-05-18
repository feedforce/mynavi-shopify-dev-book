import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, Layout, Page } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Layout>
          <Layout.Section>
            <Card title="Order details" sectioned>
              <p>View a summary of your order.</p>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title="Tags" sectioned>
              <p>Add tags to your order.</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
