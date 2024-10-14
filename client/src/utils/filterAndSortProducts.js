export const filterAndSortProducts = (
  products,
  { minPrice, maxPrice, onlyDiscounted, selectedCategory, sortOrder }
) => {
  let filteredProducts = products.filter(product => {
    const priceCheck =
      (minPrice === '' || product.price >= minPrice) &&
      (maxPrice === '' || product.price <= maxPrice);
    const discountCheck = !onlyDiscounted || product.discont_price !== null;
    const categoryCheck =
      selectedCategory === '' ||
      product.categoryId === parseInt(selectedCategory);

    return priceCheck && discountCheck && categoryCheck;
  });

  // Сортировка
  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => {
      const priceA =
        a.discont_price !== null && a.discont_price < a.price
          ? a.discont_price
          : a.price;
      const priceB =
        b.discont_price !== null && b.discont_price < b.price
          ? b.discont_price
          : b.price;
      return priceA - priceB;
    });
  } else if (sortOrder === 'desc') {
    filteredProducts.sort((a, b) => {
      const priceA =
        a.discont_price !== null && a.discont_price < a.price
          ? a.discont_price
          : a.price;
      const priceB =
        b.discont_price !== null && b.discont_price < b.price
          ? b.discont_price
          : b.price;
      return priceB - priceA;
    });
  }

  return filteredProducts;
};
