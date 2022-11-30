export const fetchData = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`bad response status ${response.status}`);
  }

  return response.text()
};

export const parseString = (value: any): string => {
  return value ? String(value) : '';
}

export const parseNumber = (value: any): number => {
  return value ? Number(value) : 0;
}