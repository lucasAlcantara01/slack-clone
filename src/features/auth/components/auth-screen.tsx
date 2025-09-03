'use client';
import { useState } from 'react';
import { SignInFlow } from '../types';
import { SignInCard } from './SignInCard';
import { SignUpCard } from './SignUpCard';

export function AuthScreen() {
  const [state, setState] = useState<SignInFlow>('signIn');

  return (
    <div className="h-full flex item-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[420px] flex items-center">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
}
