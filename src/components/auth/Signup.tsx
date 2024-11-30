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
import { Link } from 'react-router-dom';
import P from '../typography/P';
import { cn } from '@/lib/utils';
import { PASSWORD_REGEX } from '@/lib/regexHelpers';

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
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
});

function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    console.log('Form submitted with:', data);
  };

  return (
    <main>
      <div className="flex justify-center items-center mt-24 md:mt-0 md:min-h-[100vh]">
        <Card className="md:min-w-[375px] min-w-[calc(100%-2rem)]">
          <CardHeader>
            <CardTitle>
              <H2>Register</H2>
            </CardTitle>
            <CardDescription>
              <MutedPara>Signup for a new account.</MutedPara>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 my-6 gap-4">
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
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 justify-center w-full items-center">
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
