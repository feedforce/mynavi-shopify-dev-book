import { useEffect, useState } from "react";
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShop,
  flattenConnection,
} from "@shopify/hydrogen";
import { print } from "graphql";
import gql from "graphql-tag";

function useProducts<T>(): { data: T | null } {
  const [data, setData] = useState<T | null>(null);
  const { storeDomain, storefrontApiVersion, storefrontToken } = useShop();
  const url = `https://${storeDomain}/api/${storefrontApiVersion}/graphql.json`;
  const body = JSON.stringify({
    query: print(QUERY),
    variables: {
      handle: "tshirts", // 検証用の開発ストアに設定されていた商品コレクションのhandleを指定しています。
      numProducts: 10,
    },
  });
  // Storefront APIへのリクエスト方法は、既出のものと同じです。
  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontToken,
        "content-type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, [url]);

  return { data };
}

type Product = {
  vendor: string;
  descriptionHtml: string;
  handle: string;
  title: string;
  id: string;
};
type ProductResponse = {
  collection: {
    id: string;
    title: string;
    description: string;
    products: {
      edges: [
        {
          node: Product;
        }
      ];
    };
  };
};

export const ProductList: React.FC = () => {
  const { data: products } = useProducts<ProductResponse>();
  // data が nullの時は、データ取得中であることがuseProductsの実装から分かります。
  return products == null ? (
    <div>Loading</div>
  ) : (
    <ul>
      {flattenConnection<Product>(products.collection.products).map(
        ({ title, id }) => (
          <div key={id}>{title}</div>
        )
      )}
    </ul>
  );
};

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $numProducts: Int!
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 0
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collection(handle: $handle) {
      id
      title
      descriptionHtml
      products(first: $numProducts) {
        edges {
          node {
            vendor
            ...ProductProviderFragment
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }

  ${MediaFileFragment}
  ${ProductProviderFragment}
`;
