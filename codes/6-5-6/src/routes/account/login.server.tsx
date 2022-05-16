import React, {Suspense} from 'react';
import {LoginForm} from './login.client';

export default function Login() {
  return (
    <div>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
