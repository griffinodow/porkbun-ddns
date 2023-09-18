export const validateResponse = async (response: Response) => {
  const json = await response.json();
  if (json.status !== "SUCCESS") {
    console.error(json.message);
    throw new Error("FETCH_ERROR");
  }
  return json;
};
