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
import { AxiosError } from 'axios';

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
  const redirectTo = location.state?.pathname ? location.state?.pathname: "/"

  const { toast } = useToast();
  const { setUser } = useUserState();

  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema)
  });

  const handlePasswordView = () => {
    setInputType((prev) => {
      return prev === 'text' ? 'password' : 'text';
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (body) => {
    try {
      setIsLoading(true);
      const result = await login(body);

      if (result instanceof AxiosError) {
        return toast({
          title: 'Info',
          description: result.response?.data.message
        });
      }
  
      if (result instanceof Error) {
        return toast({
          title: 'Failed',
          description: result.message
        });
      }

      const {
        data: { status, data, message }
      } = result!;

      if (status === 200) {
        toast({
          title: 'Success',
          description: message
        });
        setUser(data);
        navigate(redirectTo);
      } else {
        toast({
          title: 'Failed',
          description: message
        });
      }
    } catch (error: any) {
      toast({
        title: 'Failed',
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center p-2 md:min-h-[calc(90vh-70px)]">
        <Card className="min-w-[calc(100%-2rem)] md:max-w-[375px]">
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
                            className="absolute right-0 top-0"
                            onClick={handlePasswordView}
                          >
                            {inputType === 'password' ? <EyeClosed /> : <Eye />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? 'Please Wait..' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col">
            <div className="flex items-center gap-2">
              <P>Forgot password ?</P>
              <Link
                to={'/auth/reset-password'}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'h-0 p-0 text-xs font-semibold'
                )}
              >
                Click here
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <P>Does not have an account ?</P>
              <Link
                to={'/auth/signup'}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'h-0 p-0 text-xs font-semibold'
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
