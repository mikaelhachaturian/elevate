export const getEnv = (key: string, defaultValue: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};

export function hasField<T extends object>(
  obj: T,
  key: keyof any
): key is keyof T {
  return key in obj;
}
