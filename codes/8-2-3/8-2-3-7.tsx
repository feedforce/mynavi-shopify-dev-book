import jaTranslations from "@shopify/polaris/locales/ja.json";
import {
  AppProvider,
  Card,
  FormLayout,
  Layout,
  Page,
  TextField,
} from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            id="storeDetails"
            title="Store details"
            description="Shopify and your customers will use this information to contact you."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Store name"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  type="email"
                  label="Account email"
                  onChange={() => {}}
                  autoComplete="email"
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
