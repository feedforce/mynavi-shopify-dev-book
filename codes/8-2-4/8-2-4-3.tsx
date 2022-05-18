import { useState, useCallback } from "react";
import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Card, Page, TextField } from "@shopify/polaris";

function App() {
  const [textFieldValue, setTextFieldValue] = useState("Jaded Pixel");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  return (
    <AppProvider i18n={jaTranslations}>
      <Page>
        <Card title="Shipment 1234" sectioned>
          <TextField
            label="Store name"
            value={textFieldValue}
            onChange={handleTextFieldChange}
            maxLength={20}
            autoComplete="off"
            showCharacterCount
          />
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
