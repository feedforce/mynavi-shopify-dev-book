import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Banner, Page } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Banner
          title="USPS has updated their rates"
          action={{ content: "Update rates", url: "" }}
          secondaryAction={{ content: "Learn more" }}
          status="info"
          onDismiss={() => {}}
        >
          <p>Make sure you know how these changes affect your store.</p>
        </Banner>
      </Page>
    </AppProvider>
  );
}

export default App;
