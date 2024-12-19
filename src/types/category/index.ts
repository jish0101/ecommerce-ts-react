export type Category = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type SubCategoryWithCategory = SubCategory & { category: Category };
