import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { createCategory } from '@/api/category';
import { Button } from '@/components/ui/button';
import { getInputOptions } from './form-options';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import useModal from '@/store/modal/useModal';

type Props = {};

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100, "Max 100 chars allowed"),
});

type FormBody = z.infer<typeof schema>;

const defaultValues = {
  name: '',
};

const CategoryForm = ({}: Props) => {
  const client = useQueryClient();
  const axios = useAxiosPrivate();
  const { toggleModal } = useModal();

  const {
    isLoading,
    mutateAsync: createCatAsync,
  } = useMutation({
    mutationKey: ["categories/all", "categories"],
    mutationFn: (payload: any) => createCategory(payload, axios)
  });

  const inputOptions = getInputOptions<FormBody>();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const submitHandler: SubmitHandler<FormBody> = async (body) => {
    const result = await createCatAsync(body);
    
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

    const { status, message } = result;

    if (status === 200) {
        toast({
          title: 'Success',
          description: message
        });
      toggleModal();
      return client.invalidateQueries(["categories/all", "categories"])
    } else {
      return toast({
        title: 'Info',
        description: message
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap gap-4 p-4 md:p-3"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="flex justify-center items-center w-full gap-2">
          {Object.keys(inputOptions).map((key) => {
            const currentOption = inputOptions[key as FieldPath<FormBody>];

            return (
              <FormField
                key={key}
                name={key as FieldPath<FormBody>}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem
                      className={cn(
                        'flex w-[275px] flex-col justify-center',
                        currentOption.className
                      )}
                    >
                      <FormLabel className={'capitalize'}>
                        {field.name}
                      </FormLabel>
                      <FormControl>
                        <Input {...currentOption} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </div>
        <div className="flex w-full items-center justify-center">
          <Button disabled={isLoading}>
            {isLoading ? 'Submitting..' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm