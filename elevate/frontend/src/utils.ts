export const getEnv = (key: string, defaultValue: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};
