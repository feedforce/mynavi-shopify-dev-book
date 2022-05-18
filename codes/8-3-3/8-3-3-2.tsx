import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { AppLink, NavigationMenu } from "@shopify/app-bridge/actions";

const createAppLink = (label: string, destination: string): AppLink.AppLink => {
  const app = useAppBridge();
  return AppLink.create(app, { label, destination });
};

const MyNavigationMenu: React.FC = () => {
  const app = useAppBridge();
  NavigationMenu.create(app, {
    items: [
      createAppLink("メニュー1", "/menu1"),
      createAppLink("メニュー2", "/menu2"),
      createAppLink("メニュー3", "/menu3"),
    ],
  });
  return <></>;
};

export default MyNavigationMenu;
