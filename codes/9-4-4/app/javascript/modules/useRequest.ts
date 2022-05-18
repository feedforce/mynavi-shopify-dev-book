import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

export const useRequest = (): (<T = any>(
  path: string,
  requestInit?: RequestInit
) => Promise<T>) => {
  const app = useAppBridge();
  return useCallback(
    async <T extends {}>(path: string, requestInit?: RequestInit) => {
      const sessionToken = await getSessionToken(app);
      return fetchWithSessionToken<T>(path, sessionToken, requestInit);
    },
    [app]
  );
};

const fetchWithSessionToken = async <T extends {}>(
  path: string,
  sessionToken: string,
  requestInit?: RequestInit
): Promise<T> => {
  const response = await fetch(path, {
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${sessionToken}`,
      ...requestInit?.headers,
    },
    body: JSON.stringify(requestInit?.body),
  });
  return response.json();
};
