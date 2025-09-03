import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthActions } from '@convex-dev/auth/react';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SignInFlow } from '../types';

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

  function onProviderSignIn(value: 'github' | 'google') {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  }

  return (
    <Card className="w-full h-fit p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Fazer Login</CardTitle>
        <CardDescription>
          Use seu email ou outro serviço para continuar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form action="" className="space-y-2.5">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
      </CardContent>
      <Separator />
      <div className="flex flex-col gap-y-2.5">
        <Button
          disabled={pending}
          onClick={() => {
            onProviderSignIn('google');
          }}
          variant="outline"
          size="lg"
          className="w-full relative"
        >
          <FcGoogle className="size-5 absolute left-2.5 top-[50%] -translate-y-1/2" />
          Continue with google
        </Button>
        <Button
          disabled={pending}
          onClick={() => {
            onProviderSignIn('github');
          }}
          variant="outline"
          size="lg"
          className="w-full relative"
        >
          <FaGithub className="size-5 absolute left-2.5 top-[50%] -translate-y-1/2" />
          Continue with github
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Don't have an account?
        <span
          onClick={() => setState('signUp')}
          className="text-sky-700 hover:underline cursor-pointer"
        >
          SignUp
        </span>
      </p>
    </Card>
  );
}
