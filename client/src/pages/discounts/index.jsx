import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import NavBred from '../../ui/navRender';
import { filterAndSortProducts } from '../../utils/filterAndSortProducts';
import FilterSort from '../../ui/filterSort';
import DiscountedProducts from '../../components/discountProd';// Импортируем новый компонент

function DiscountList() {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(state => state.categories);

  const [visibleItem, setVisibleItem] = useState(4);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    onlyDiscounted: true,
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
    return <div>No available categories</div>;
  }

  const allProducts = categories.flatMap(category => category.data);
  const filteredAndSortedProducts = filterAndSortProducts(allProducts, filters);

  function loadMore() {
    setVisibleItem(prevCount => prevCount + 4);
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: '0 2.8%' }}>
        <NavBred />
        <h1 style={{ margin: '2.8% 0' }}>Discounted items</h1>
        <FilterSort
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onlyDiscounted={filters.onlyDiscounted}
          selectedCategory={filters.selectedCategory}
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
          setSelectedCategory={value =>
            setFilters(prev => ({ ...prev, selectedCategory: value }))
          }
          setSortOrder={value =>
            setFilters(prev => ({ ...prev, sortOrder: value }))
          }
          categories={categories}
          showDiscountCheckbox={false}
        />
      </div>

      {/* Передаем фильтрованные и отсортированные товары в новый компонент */}
      <DiscountedProducts
        products={filteredAndSortedProducts}
        visibleItem={visibleItem}
        loadMore={loadMore}
      />
    </div>
  );
}

export default DiscountList;
