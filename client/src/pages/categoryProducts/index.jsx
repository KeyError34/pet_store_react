
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { filterAndSortProducts } from '../../utils/filterAndSortProducts';
import FilterSort from '../../ui/filterSort';
import { addToBasket } from '../../redux/slices/basketSlice';
import ProductCard from '../../ui/card';
import FlexBox from '../../ui/flexBox';
import NavBred from '../../ui/navRender';
function CategoryProducts() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { categories, loading, error } = useSelector(state => state.categories);

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    onlyDiscounted: false,
    sortOrder: 'asc',
  });

  const [visibleItem, setVisibleItem] = useState(4);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const category = categories.find(
    category => category.category.id === Number(id)
  );
  const products = category ? category.data : [];

  const numericFilters = {
    ...filters,
    minPrice: filters.minPrice ? Number(filters.minPrice) : '',
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : '',
  };

  const filteredAndSortedProducts = filterAndSortProducts(products, {
    ...numericFilters,
    selectedCategory: id,
  });

  function loadMore() {
    setVisibleItem(prevCount => prevCount + 4);
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddToCart = product => {
    dispatch(addToBasket(product));
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: '0 2.8%' }}>
        <NavBred/>
        <h1 style={{ margin: '2.8% 0' }}>
          {category ? category.category.title : 'Категория не найдена'}
        </h1>

        <FilterSort
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onlyDiscounted={filters.onlyDiscounted}
          sortOrder={filters.sortOrder}
          setMinPrice={value =>
            setFilters(prev => ({ ...prev, minPrice: value }))
          }
          setMaxPrice={value =>
            setFilters(prev => ({ ...prev, maxPrice: value }))
          }
          setOnlyDiscounted={value =>
            setFilters(prev => ({ ...prev, onlyDiscounted: value }))
          }
          setSortOrder={value =>
            setFilters(prev => ({ ...prev, sortOrder: value }))
          }
          selectedCategory={id}
          categories={categories}
          showCategorySelect={false}
        />
      </div>
      <FlexBox>
        {!filteredAndSortedProducts.length ? (
          <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
            No products available
          </div>
        ) : (
          filteredAndSortedProducts.slice(0, visibleItem).map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              discont_price={product.discont_price}
              image={`http://localhost:3333/${product.image}`}
              navigatePath={`/category/product/${product.id}`}
              onAddToCart={() => handleAddToCart(product)} 
              initialText="Add to Cart"
              toggledText="Added"
              isCategoryButton={false} 
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

export default CategoryProducts;