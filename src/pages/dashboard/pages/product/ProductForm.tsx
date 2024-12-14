import { z } from 'zod';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import FilesInput from '@/components/ui/filesInput';
import { createProduct } from '@/api/product';
import { useEffect, useState } from 'react';
import { cn, isImageValid, makeSelectOptions } from '@/lib/utils';
import FileInputImage from '@/components/ui/FileInputImage';
import { getProductInputOptions } from './form-options';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AxiosError } from 'axios';
import { GetResponse } from '@/types/api';
import { Category } from '@/types/category';
import useModal from '@/store/modal/useModal';

type Props = {
  categories?: GetResponse<Category>
};

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  desc: z.string().min(1, 'Description is required').max(1000, "Max 1000 characters allowed"),
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

const ProductForm = ({categories}: Props) => {
  const client = useQueryClient();
  const axios = useAxiosPrivate();
  const {toggleModal} = useModal();

  const {
    mutateAsync: createProductAsync,
    isLoading,
  } = useMutation({
    mutationKey: 'products',
    mutationFn: (payload: any) => createProduct(payload, axios)
  });

  const [error, setError] = useState('');
  const [images, setImages] = useState<Record<string, File>>({});

  const categoryData = categories
    ? makeSelectOptions(categories.data, 'name', '_id')
    : [];
  const inputOptions = getProductInputOptions<FormBody>(categoryData);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  function validateImages(images: Record<string, File>) {
    const results = isImageValid(
      Object.values(images).map((f) => f),
      1024 * 1024 * 20
    );

    if (!results && Object.values(images).length > 0) {
      setError('Max image size allowed is 2 megabytes');
      return false;
    }
    return true;
  }

  function imageHandler(files: Record<string, File>) {
    const result = validateImages(files);

    if (!result) {
      setError('Max image size allowed is 2 megabytes');
    } else {
      setError('');
    }

    setImages(files);
  }

  const submitHandler: SubmitHandler<FormBody> = async (body) => {
    if (error) return;

    const formData = new FormData();
    const files = Object.values(images);

    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    files.forEach((file) => {
      formData.append('productImages', file);
    });

    const result = await createProductAsync(formData);

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
      client.invalidateQueries("products")
    } else {
      return toast({
        title: 'Info',
        description: message
      });
    }
  };

  useEffect(() => {
    validateImages(images);
  }, [images]);

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap gap-4 p-4 md:p-3"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="flex flex-wrap gap-2">
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
                        'flex w-[200px] flex-col justify-center',
                        currentOption.className
                      )}
                    >
                      <FormLabel className={'capitalize'}>
                        {field.name}
                      </FormLabel>
                      {currentOption.options ? (
                        <Select
                          disabled={categories === undefined ? true:false}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={currentOption.placeholder}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentOption.options.map((option) => (
                              <SelectItem value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <FormControl>
                          <Input {...currentOption} {...field} />
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </div>
        <div className="flex min-h-[100px] w-full min-w-[100%] max-w-[300px] flex-col px-4 md:min-h-[200px] md:px-3">
          <FilesInput
            maxFiles={4}
            error={error}
            inputState={images}
            accepts={{ 'image/*': [] }}
            inputChangeHandler={imageHandler}
          />
          <FileInputImage
            inputState={images}
            inputChangeHandler={imageHandler}
          />
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
