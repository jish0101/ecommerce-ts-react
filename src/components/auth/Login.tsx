'use client';

import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import MutedPara from '../typography/MutedPara';
import H2 from '../typography/H2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import P from '../typography/P';
import { asyncWrapper, cn } from '@/lib/utils';
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { login } from '@/api/auth/login';
import useUserState from '@/store/user/useUserState';

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'This is required*')
    .max(1000, 'This is too long!!')
    .email('This is not a valid email*'),
  password: z.string().trim().min(1, 'This is required*')
});

const defaultValues = {
  email: '',
  password: ''
};

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserState();
  const [inputType, setInputType] = useState<'password' | 'text'>('password');
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const handlePasswordView = () => {
    setInputType((prev) => {
      return prev === 'text' ? 'password' : 'text';
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (body) => {
    const { response, error } = await asyncWrapper(
      async () => await login(body)
    );

    if (error !== null) {
      return console.info('Server error: ', error.message);
    }

    const {
      data: { status, data, message }
    } = response!;

    if (status === 200) {
      setUser(data);
      navigate(location.state.pathname);
    } else {
      // show toast
      console.log(message);
    }
  };

  return (
    <main>
      <div className="flex justify-center items-center mt-24 md:mt-0 md:min-h-[100vh]">
        <Card className="md:min-w-[375px] min-w-[calc(100%-2rem)]">
          <CardHeader>
            <CardTitle>
              <H2>Login</H2>
            </CardTitle>
            <CardDescription>
              <MutedPara>Login to your account.</MutedPara>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={inputType}
                            placeholder="Password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={'link'}
                            className="absolute top-0 right-0"
                            onClick={handlePasswordView}
                          >
                            {inputType === 'password' ? <Eye /> : <EyeClosed />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 justify-center w-full items-center">
              <P>Does not have an account yet ?</P>
              <Link
                to={'/auth/signup'}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'p-0 text-xs font-semibold'
                )}
              >
                Click here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Login;
