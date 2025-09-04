import { TriangleAlert } from 'lucide-react';
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

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuthActions } from '@convex-dev/auth/react';
import { SignInFlow } from '../types';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  function onPasswordSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password != confirmPassword) {
      setError('Password do no match ');
      return;
    }

    setPending(true);
    signIn('password', { name, email, password, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setPending(false);
      });
  }

  function onProviderSignUp(value: 'github' | 'google') {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  }

  return (
    <Card className="w-full h-fit p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Fazer Cadastro</CardTitle>
        <CardDescription>
          Use seu email ou outro serviço para continuar
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
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
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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
            onProviderSignUp('google');
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
            onProviderSignUp('github');
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
        Already have an account?
        <span
          onClick={() => setState('signIn')}
          className="text-sky-700 hover:underline cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </Card>
  );
}
