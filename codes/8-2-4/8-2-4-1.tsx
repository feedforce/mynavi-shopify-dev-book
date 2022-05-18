import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Page, Card, Button, ButtonGroup } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={jaTranslations}>
      <Page title="Example app">
        <Card sectioned>
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button primary>Save</Button>
          </ButtonGroup>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
