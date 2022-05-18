import { useState, useCallback } from "react";
import jaTranslations from "@shopify/polaris/locales/ja.json";
import { AppProvider, Modal, TextContainer } from "@shopify/polaris";

function App() {
  const [active, setActive] = useState(true);
  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <AppProvider i18n={jaTranslations}>
      <Modal
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{ content: "Add Instagram", onAction: handleChange }}
        secondaryActions={[{ content: "Learn more", onAction: handleChange }]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </AppProvider>
  );
}

export default App;
