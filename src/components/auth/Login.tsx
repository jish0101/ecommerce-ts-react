import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import P from '../typography/P';
import { useState } from 'react';
import H2 from '../typography/H2';
import { login } from '@/api/auth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeClosed } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { asyncWrapper, cn } from '@/lib/utils';
import MutedPara from '../typography/MutedPara';
import useUserState from '@/store/user/useUserState';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();

  const { toast } = useToast();
  const { setUser } = useUserState();

  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      const { response, error } = await asyncWrapper(() => login(body));

      if (error !== null) {
        setIsLoading(false);
        return toast({
          title: 'Failed',
          description: error.response
            ? error.response.data?.message
            : error.message
        });
      }

      const {
        data: { status, data, message }
      } = response!;

      if (status === 200) {
        setUser(data);
        toast({
          title: 'Success',
          description: message
        });
        setIsLoading(false);
        navigate(location.state?.pathname ?? '/');
      } else {
        toast({
          title: 'Failed',
          description: message
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: 'Failed',
        description: error.message
      });
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

                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? 'Wait..' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col">
            <div className="flex gap-2 items-center">
              <P>Forgot password ?</P>
              <Link
                to={'/auth/reset-password'}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'p-0 text-xs font-semibold h-0'
                )}
              >
                Reset your password
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <P>Does not have an account ?</P>
              <Link
                to={'/auth/signup'}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'p-0 text-xs font-semibold h-0'
                )}
              >
                Create a new account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Login;
