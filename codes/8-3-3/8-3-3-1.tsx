import React from "react";
import { Card, Page } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

const MyRedirect: React.FC = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  // 埋め込みアプリのドメイン内の path にリダイレクト
  const linkToAppPath = {
    content: "設定ページ",
    onAction: () => {
      redirect.dispatch(Redirect.Action.APP, "/settings");
    },
  };

  // 外部のドメインの URL にリダイレクト
  const linkToRemoteUrl = {
    content: "example.com を開く",
    onAction: () => {
      redirect.dispatch(Redirect.Action.REMOTE, "https://example.com");
    },
  };

  // ストア管理画面内の path にリダイレクト
  const linkToAdminPath = {
    content: "顧客一覧ページ",
    onAction: () => {
      redirect.dispatch(Redirect.Action.ADMIN_PATH, {
        path: "/customers",
        newContext: true,
      });
    },
  };

  return (
    <Page>
      <Card
        title="Redirect example"
        secondaryFooterActionsDisclosureText="リンク一覧"
        secondaryFooterActions={[
          linkToAppPath,
          linkToRemoteUrl,
          linkToAdminPath,
        ]}
      />
    </Page>
  );
};

export default MyRedirect;
