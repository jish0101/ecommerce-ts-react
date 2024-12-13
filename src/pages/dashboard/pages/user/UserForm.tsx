import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { useState } from 'react';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { toast } from '@/hooks/use-toast';
import { CreateResponse } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PASSWORD_REGEX } from '@/lib/regexHelpers';
import { zodResolver } from '@hookform/resolvers/zod';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { SubmitHandler, useForm } from 'react-hook-form';
// import useModal from '@/store/modal/useModal';

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(100, 'Max 100 chars allowed'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(100, 'Max 100 chars allowed'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(100, 'Max 100 chars allowed'),
  password: z
    .string()
    .trim()
    .min(1, 'Password is required')
    .max(100, 'Max 100 chars allowed')
    .regex(
      PASSWORD_REGEX,
      `Minimum 8 chars, one uppercase, lowercase, number and a special char`
    )
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

type Props = {};

const UserForm = ({}: Props) => {
  // const {payload} = useModal();
  const axiosPrivate = useAxiosPrivate();
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    error
  } = useMutation({
    mutationKey: 'users',
    mutationFn: async (payload: any) => {
      const response = (await axiosPrivate.post(
        '/api/users/create',
        payload
      )) as AxiosResponse<CreateResponse<Partial<User>>>;

      return response.data;
    }
  });

  const form = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const handlePasswordView = () => {
    setInputType((prev) => {
      return prev === 'text' ? 'password' : 'text';
    });
  };

  const submitHandler: SubmitHandler<z.infer<typeof schema>> = async (body) => {
    const response = await createUser(body);

    if (isError || error) {
      return toast({
        title: 'Failed',
        description: (error as any).response
          ? (error as any).response.data?.message
          : (error as any).message
      });
    }

    const { status, message } = response;

    if (status === 200) {
      return toast({
        title: 'Success',
        description: message
      });
    } else {
      return toast({
        title: 'Info',
        description: message
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter an email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder="Enter a password"
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

        <div className="flex w-full items-center justify-center">
          <Button disabled={isLoading}>
            {isLoading ? 'Submitting..' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
