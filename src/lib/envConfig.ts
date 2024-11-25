const getEnv = (key: string): string => {
  return import.meta.env[key] ?? '';
};

export default getEnv;
