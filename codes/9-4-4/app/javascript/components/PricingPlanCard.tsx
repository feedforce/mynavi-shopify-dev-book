import React from "react";
import {
  Card,
  Action,
  DisplayText,
  List,
  TextContainer,
} from "@shopify/polaris";
import PricingPlanSkeletonCard from "./PricingPlanSkeletonCard";

export type Plan = "free" | "standard" | undefined;

type Props = {
  plan: Plan;
  isCurrentPlan: boolean | undefined;
  price: number;
  listItems: Array<string>;
  onAction: Action["onAction"];
};

const PricingPlanCard: React.FC<Props> = ({
  plan,
  isCurrentPlan,
  price,
  listItems,
  onAction,
}) => {
  if (isCurrentPlan === undefined) {
    return <PricingPlanSkeletonCard />;
  }

  return (
    <Card
      sectioned
      title={plan}
      primaryFooterAction={{
        content: "Subscribe",
        disabled: isCurrentPlan,
        onAction,
      }}
    >
      <TextContainer>
        <DisplayText size="large">${price}/month</DisplayText>
        <List>
          {listItems.map((listItem, index) => (
            <List.Item key={index}>{listItem}</List.Item>
          ))}
        </List>
      </TextContainer>
    </Card>
  );
};

export default PricingPlanCard;
