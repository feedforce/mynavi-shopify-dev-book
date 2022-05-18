import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

const app = useAppBridge();
const sessionToken = await getSessionToken(app);
