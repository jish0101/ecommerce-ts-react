import Fallback from './Fallback';
import { GetResponse } from '@/types/api';
import H4 from '@/components/typography/H4';
import { NavOption } from './navigation/types';
import NavOptions from './navigation/NavOptions';
import { SubCategoryWithCategory } from '@/types/category';
import useGetQuery, { UseDataQueryOptions } from '@/hooks/useGetQuery';

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
      result[key].listOptions?.push({
        label: item.name,
        href: `/products?subCategoryId=${item._id}`
      });
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
      <div className="flex h-12 w-full items-center justify-center md:justify-start">
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
    <div className="flex h-12 w-full items-center justify-center sm:justify-start">
      <div className="flex items-center gap-4">
        <H4 className="hidden lg:block">Filter by category</H4>
        <nav>
          <NavOptions
            navOptions={[
              { label: 'All', href: `/products` },
              ...Object.values(data)
            ]}
          />
        </nav>
      </div>
    </div>
  );
};

export default SubCategories;
