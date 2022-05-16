import React, {useState, useEffect} from 'react';
import {useShop} from '@shopify/hydrogen/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerAccessToken, setCustomerAccessToken] = useState(null);
  // ストアのドメインやStorefront APIのアクセストークンは、shopify.config.jsに設定したものが取得できる
  const {storeDomain, storefrontApiVersion, storefrontToken} = useShop();

  const [customer, setCustomer] = useState<{
    email: string;
    firstName: string;
    lastName: string;
  } | null>(null);
  +useEffect(() => {
    if (customerAccessToken == null) return;
    fetch(`https://${storeDomain}/api/${storefrontApiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({query: QUERY, variables: {customerAccessToken}}),
    })
      .then((res) => res.json())
      .then((res) => setCustomer(res.data.customer))
      .catch((error) => {
        return {data: undefined, error: error.toString()};
      });
  }, [customerAccessToken, storeDomain, storefrontApiVersion, storefrontToken]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetch(
          `https://${storeDomain}/api/${storefrontApiVersion}/graphql.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': storefrontToken,
            },
            // カスタマーアクセストークンの取得リクエストを送信する
            body: JSON.stringify({
              query: MUTATION,
              variables: {email, password},
            }),
          },
        )
          .then((res) => res.json())
          .catch((error) => {
            return {data: undefined, error: error.toString()};
          });
      }}
    >
      <div className="mb-4">
        <input
          className="border focus:outline-none focus:shadow-outline"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div className="mb-4">
        <input
          className="border focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button className="border" type="submit">
        ログイン
      </button>
      <div>
        <div>
          名前: {customer?.lastName} {customer?.firstName}
        </div>
        <div>メールアドレス: {customer?.email}</div>
      </div>
    </form>
  );
}

const MUTATION = `
mutation customerAccessTokenCreate($email: String!, $password: String!) {
  customerAccessTokenCreate(input: {email: $email, password: $password}) {
    customerUserErrors {
      code
      field
      message
    }
    customerAccessToken {
      expiresAt
      accessToken
    }
  }
}
`;
const QUERY = `
query customer($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    id
    email
    firstName
    lastName
  }
}
`;
