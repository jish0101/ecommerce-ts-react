import { z } from 'zod';
import { useMutation } from 'react-query';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import FilesInput from '@/components/ui/filesInput';
import { createProduct } from '@/api/product';
import { useEffect, useState } from 'react';
import { isImageValid } from '@/lib/utils';

type Props = {};

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  desc: z.string().min(1, 'Description is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((n) => !isNaN(parseInt(n, 10)), { message: 'Invalid price' }),
  stock: z
    .string()
    .min(1, 'Stock is required')
    .refine((n) => !isNaN(parseInt(n, 10)), { message: 'Invalid stock' }),
  category: z.string().min(1, 'Category is required')
});

type FormBody = z.infer<typeof schema>;

const defaultValues = {
  name: '',
  desc: '',
  category: '',
  price: '',
  stock: ''
};

const ProductForm = ({}: Props) => {
  const axios = useAxiosPrivate();
  const {
    mutateAsync: createProductAsync,
    isLoading,
    isError,
    error: err
  } = useMutation({
    mutationKey: 'products',
    mutationFn: (payload: any) => createProduct(payload, axios)
  });

  const [images, setImages] = useState<Record<string, File>>({});
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  function validateImages(images: Record<string, File>) {
    const results = isImageValid(Object.values(images).map(f => f), 1024 * 1024 * 20);

    if (!results && Object.values(images).length > 0) {
      setError("Max image size allowed is 2 megabytes")
      return false;
    }
    return true;
  }

  function imageHandler(files: Record<string, File>) {
    const result = validateImages(files);

    if (!result) {
      setError("Max image size allowed is 2 megabytes");
    } else {
      setError("")
    }

    setImages(files);

  }
  
  function renderInput() {
    return Object.keys(defaultValues).map((key) => (
      <FormField
        name={key as keyof FormBody}
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  type={'text'}
                  placeholder={`Enter ${field.name}`}
                  {...field}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    ));
  }
  
  const submitHandler: SubmitHandler<FormBody> = async (body) => {
    if (error) return;

    const formData = new FormData();
    const files = Object.values(images);

    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value.toString());
    })
    
    files.forEach((file) => {
      formData.append("productImages", file);
    });

    const response = await createProductAsync(formData);

    if (isError && err) {
      return toast({
        title: 'Failed',
        description: (err as any).response
          ? (err as any).response.data?.message
          : (err as any).message
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

  useEffect(() => {
    validateImages(images);
  }, [images])

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap gap-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {renderInput()}

        <div className="flex min-h-[200px] w-full min-w-[100%] max-w-[300px]">
          <FilesInput
            maxFiles={4}
            error={error}
            inputState={images}
            accepts={{'image/*': []}}
            inputChangeHandler={imageHandler} />
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

export default ProductForm;
