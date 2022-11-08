export const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const result = await response.json();
  return result;
}