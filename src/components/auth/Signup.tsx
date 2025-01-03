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
import { asyncWrapper, cn } from '@/lib/utils';
import { useState } from 'react';
import H2 from '../typography/H2';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import MutedPara from '../typography/MutedPara';
import { PASSWORD_REGEX } from '@/lib/regexHelpers';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { createUser } from '@/api/user';
import { useToast } from '@/hooks/use-toast';
import GoogleAuthButton from './GoogleAuthButton';

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'This is required*')
    .max(100, 'This is too long!!'),
  lastName: z
    .string()
    .trim()
    .min(1, 'This is required*')
    .max(100, 'This is too long!!'),
  email: z
    .string()
    .trim()
    .min(1, 'This is required*')
    .max(1000, 'This is too long!!')
    .email('This is not a valid email*'),
  password: z
    .string()
    .trim()
    .min(1, 'This is required*')
    .regex(
      PASSWORD_REGEX,
      `Minimum 8 chars, one uppercase, lowercase, number and a special char`
    )
});

function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const handlePasswordView = () => {
    setInputType((prev) => {
      return prev === 'text' ? 'password' : 'text';
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (body) => {
    try {
      if (isLoading) return;

      setIsLoading(true);

      const { response, error } = await asyncWrapper(() => createUser(body));

      if (error) {
        setIsLoading(false);
        return toast({
          title: 'Failed',
          description: error.response
            ? error.response.data?.message
            : error.message
        });
      }

      const {
        data: {
          status,
          message,
          details: { otp }
        }
      } = response!;

      if (status === 200) {
        setIsLoading(false);
        toast({
          title: 'Success',
          description: message
        });
        navigate(`/auth/verify-user`, {
          state: {
            userId: otp.user,
            otpId: otp._id,
            type: 'EMAIL VERIFICATION'
          }
        });
      } else {
        setIsLoading(false);
        toast({
          title: 'Failed',
          description: message
        });
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
      <div className="flex items-center justify-center p-2 md:min-h-[calc(90vh-70px)]">
        <Card className="min-w-[calc(100%-2rem)] md:max-w-[375px]">
          <CardHeader className='md:pt-6 md:pb-2 space-y-3'>
            <CardTitle>
              <H2>Register</H2>
            </CardTitle>
            <CardDescription>
              <MutedPara>Signup for a new account.</MutedPara>
            </CardDescription>
          </CardHeader>
          <CardContent className='md:py-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {/* First Name */}
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter firstname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter lastname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
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
                      <FormMessage className="max-w-[30rem]" />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? 'Signing up..' : 'Sign up'}
                </Button>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-full border" />
                    OR
                    <span className="w-full border" />
                  </div>
                  <GoogleAuthButton />
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-center gap-2">
              <P>Already have an account ?</P>
              <Link
                to={'/auth/login'}
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

export default Signup;
