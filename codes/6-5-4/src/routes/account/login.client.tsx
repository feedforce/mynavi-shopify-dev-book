import React, {useState} from 'react';
import {useShop} from '@shopify/hydrogen/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ストアのドメインやStorefront APIのアクセストークンは、shopify.config.jsに設定したものが取得できる
  const {storeDomain, storefrontApiVersion, storefrontToken} = useShop();
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
