const apiUrl = "https://fakestoreapi.com/";
export async function fetchProducts() {
  const response = await fetch(`${apiUrl}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}
