import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { addToBasket } from '../../redux/slices/basketSlice';
import { useNavigate } from 'react-router-dom';
import { filterAndSortProducts } from '../../utils/filterAndSortProducts';
import FilterSort from '../../ui/filterSort';
import FlexBox from '../../ui/flexBox';
import ProductCard from '../../ui/card';

function AllProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector(state => state.categories);
  const [visibleItem, setVisibleItem] = useState(4);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    onlyDiscounted: false,
    selectedCategory: '',
    sortOrder: 'asc',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  const allProducts = categories.flatMap(category => category.data);

  const filteredAndSortedProducts = filterAndSortProducts(allProducts, filters);

  const setMinPrice = value =>
    setFilters(prev => ({ ...prev, minPrice: value }));
  const setMaxPrice = value =>
    setFilters(prev => ({ ...prev, maxPrice: value }));
  const setOnlyDiscounted = value =>
    setFilters(prev => ({ ...prev, onlyDiscounted: value }));
  const setSelectedCategory = value =>
    setFilters(prev => ({ ...prev, selectedCategory: value }));
  const setSortOrder = value =>
    setFilters(prev => ({ ...prev, sortOrder: value }));
  function loadMore() {
    setVisibleItem(prevCount => prevCount + 4);
  }

  function handleAddToCart (product) {
    dispatch(addToBasket(product));
  };

  function onClick(prodId) {
    navigate(`/category/product/${prodId}`);
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: '0 2.8%' }}>
        <h1 style={{ margin: '2.8% 0' }}>All Products</h1>
        <FilterSort
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onlyDiscounted={filters.onlyDiscounted}
          selectedCategory={filters.selectedCategory}
          sortOrder={filters.sortOrder}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setOnlyDiscounted={setOnlyDiscounted}
          setSelectedCategory={setSelectedCategory}
          setSortOrder={setSortOrder}
          categories={categories}
        />
      </div>
      <FlexBox>
        {filteredAndSortedProducts.length === 0 ? (
          <div>No products available</div>
        ) : (
          filteredAndSortedProducts
            .slice(0, visibleItem)
            .map(product => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                discont_price={product.discont_price}
                image={`http://localhost:3333/${product.image}`}
                onClick={() => onClick(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
        )}
      </FlexBox>

      {visibleItem < filteredAndSortedProducts.length && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            style={{ cursor: 'pointer', padding: '5px 8px' }}
            onClick={loadMore}
          >
            more items...
          </span>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
