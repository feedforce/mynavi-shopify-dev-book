import React, { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";

const ResourcePickerExample: React.FC = () => {
  const [open, setOpen] = useState(true);
  const closeResourcePicker = () => setOpen(false);
  return (
    <ResourcePicker
      resourceType="Product"
      open={open}
      onCancel={closeResourcePicker}
    />
  );
};

export default ResourcePickerExample;
