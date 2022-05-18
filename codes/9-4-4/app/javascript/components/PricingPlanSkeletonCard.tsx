import React from "react";
import {
  Card,
  List,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";

const PricingPlanSkeletonCard: React.FC<{}> = () => (
  <Card sectioned title={<SkeletonBodyText lines={1} />}>
    <TextContainer>
      <SkeletonDisplayText size="large" />
      <List>
        <List.Item>
          <SkeletonBodyText lines={1} />
        </List.Item>
        <List.Item>
          <SkeletonBodyText lines={1} />
        </List.Item>
        <List.Item>
          <SkeletonBodyText lines={1} />
        </List.Item>
      </List>
      <SkeletonBodyText lines={1} />
    </TextContainer>
  </Card>
);
export default PricingPlanSkeletonCard;
