export type NavOption = {
  label: string;
  href?: string;
  listOptions?: {
    label: string;
    href: string;
    description?: string;
  }[];
};
