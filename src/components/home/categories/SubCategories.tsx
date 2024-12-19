import Fallback from './Fallback';
import { GetResponse } from '@/types/api';
import { NavOption } from './navigation/types';
import NavOptions from './navigation/NavOptions';
import { SubCategoryWithCategory } from '@/types/category';
import useGetQuery, { UseDataQueryOptions } from '@/hooks/useGetQuery';
import H4 from '@/components/typography/H4';

function formatCategories(data: SubCategoryWithCategory[]) {
  try {
    return data.reduce((result: Record<string, NavOption>, item) => {
      const key = item.category._id;
      if (!result[key]) {
        result[key] = {
          label: item.category.name,
          listOptions: []
        };
      }
      result[key].listOptions?.push({ label: item.name, href: `/products/${item._id}` });
      return result;
    }, {});
  } catch (error) {
    return {};
  }
}

const SubCategories = () => {
  const options: UseDataQueryOptions = {
    queryKey: 'sub-categories/all',
    endpoint: '/api/sub-categories/get?isPaginationDisabled=true'
  };

  const {
    data: response,
    isLoading,
    isError
  } = useGetQuery<GetResponse<SubCategoryWithCategory>>(options);

  if (isLoading || isError || !response) {
    return (
      <div className="flex w-full items-center justify-center border py-8">
        <Fallback
          isError={isError}
          isLoading={isLoading}
          errorMessage="No categories found"
          fallBackMessaage="No categories found"
        />
      </div>
    );
  }

  const data = formatCategories(response.data);

  return (
    <div className="flex w-full items-center border-b py-1 md:px-10">
      <div className="w-fit flex gap-4 items-center">
        <H4>Explore by category</H4>
        <NavOptions navOptions={[{label: "All", href: `/products/all`}, ...Object.values(data)]} />
      </div>
    </div>
  );
};

export default SubCategories;
