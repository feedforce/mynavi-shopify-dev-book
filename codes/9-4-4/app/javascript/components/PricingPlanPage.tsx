import { parse } from "querystring";
import React, { useEffect, useState } from "react";
import { Layout, Page } from "@shopify/polaris";
import PricingPlanCard, { Plan } from "./PricingPlanCard";
import { useRequest } from "../modules/useRequest";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";

type Response = {
  app_subscription: { plan: Plan };
};

const PricingPlanPage: React.FC<{}> = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const request = useRequest();
  const [currentPlan, setCurrentPlan] = useState<Plan>(undefined);
  const query = parse(window.location.search.slice(1));

  const requestSubscription = (method: "GET" | "POST", path: string) => {
    request(path, { method: method }).then((response: Response) => {
      setCurrentPlan(response.app_subscription.plan);
    });
  };

  const freePlanAction = () => {
    requestSubscription("POST", "app_subscription/free");
  };

  const standardPlanAction = () => {
    request("app_subscription/standard", { method: "POST" }).then(
      (response) => {
        redirect.dispatch(
          Redirect.Action.REMOTE,
          response.app_subscription.confirmation_url
        );
      }
    );
  };

  useEffect(() => {
    if (query.activate) {
      requestSubscription("POST", "app_subscription/activate");
    } else {
      requestSubscription("GET", "app_subscription");
    }
  });

  return (
    <Page title="Pricing plan">
      <Layout>
        <Layout.Section oneHalf>
          <PricingPlanCard
            plan="free"
            isCurrentPlan={currentPlan && currentPlan === "free"}
            price={0}
            listItems={[
              "Send 10 email notifications",
              "Feature description 1",
              "Feature description 2",
            ]}
            onAction={freePlanAction}
          />
        </Layout.Section>
        <Layout.Section oneHalf>
          <PricingPlanCard
            plan="standard"
            isCurrentPlan={currentPlan && currentPlan === "standard"}
            price={10}
            listItems={[
              "Send unlimited email notifications",
              "$1 for 100 emails",
              "Feature description",
            ]}
            onAction={standardPlanAction}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default PricingPlanPage;
