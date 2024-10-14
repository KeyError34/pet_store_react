
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCategories } from '../../redux/slices/categoriesSlice';
// import { filterAndSortProducts } from '../../utils/filterAndSortProducts';
// import Input from '../../ui/input';
// import styles from './styles.module.scss';
// import ProductCard from '../../ui/card';
// import FlexBox from '../../ui/flexBox';
// import CustomSelect from '../../ui/select';

// const CategoryProducts = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { categories, loading, error } = useSelector(state => state.categories);

//   const [filters, setFilters] = useState({
//     minPrice: '',
//     maxPrice: '',
//     onlyDiscounted: false,
//     sortOrder: 'asc',
//   });

//   const [visibleItem, setVisibleItem] = useState(4);

//   const sortOptions = [
//     { value: 'def', label: 'by default' },
//     { value: 'asc', label: 'Low to High' },
//     { value: 'desc', label: 'High to Low' },
//   ];

//   useEffect(() => {
//     if (!categories.length) {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, categories]);

//   const category = categories.find(category => category.category.id === Number(id));
//   const products = category ? category.data : [];

//   const numericFilters = {
//     ...filters,
//     minPrice: filters.minPrice ? Number(filters.minPrice) : '',
//     maxPrice: filters.maxPrice ? Number(filters.maxPrice) : '',
//   };

// const filteredAndSortedProducts = filterAndSortProducts(products, {
//   ...numericFilters,
//   selectedCategory: id,
// });

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };


// const handleSortChange = selectedOption => {
//   if (selectedOption) {
    
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       sortOrder: selectedOption.value,
//     }));
//   } else {
//     console.log('No option selected');
//   }
// };

//   const loadMore = () => {
//     setVisibleItem(prevCount => prevCount + 4);
//   };

//   function onClick(prodId) {
//     navigate(`/category/product/${prodId}`);
//   }

//   if (loading) {
//     return <div>Загрузка товаров...</div>;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

//   return (
//     <div>
//       <div className={styles.mainSortContainer}>
//         <div className={styles.inputsContainer}>
//           <p>Price</p>
//           <Input
//             style={{ borderRadius: '4px', maxWidth: '112px', maxHeight: '36px' }}
//             type="number"
//             name="minPrice"
//             value={filters.minPrice}
//             onChange={handleFilterChange}
//           />
//           <Input
//             style={{ borderRadius: '4px', maxWidth: '112px', maxHeight: '36px' }}
//             type="number"
//             name="maxPrice"
//             value={filters.maxPrice}
//             onChange={handleFilterChange}
//           />
//         </div>

//         <div className={styles.sortContainer}>
//           <label>
//             Discounted items
//             <Input
//               type="checkbox"
//               name="onlyDiscounted"
//               checked={filters.onlyDiscounted}
//               onChange={handleFilterChange}
//             />
//           </label>
          
//           <label>
//             Sorted
//            <CustomSelect
//   options={sortOptions}
//   value={sortOptions.find(opt => opt.value === filters.sortOrder)}
//   onChange={handleSortChange}
//   placeholder="by default"
// />
//           </label>
//         </div>
//       </div>


// <FlexBox>
//         {!filteredAndSortedProducts.length ? (
//           <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
//             No products available
//           </div>
//         ) : (
//           filteredAndSortedProducts.slice(0, visibleItem).map(product => (
//             <ProductCard
//               key={product.id}
//               title={product.title}
//               price={product.price}
//               discont_price={product.discont_price}
//               image={`http://localhost:3333/${product.image}`}
//               onClick={() => onClick(product.id)}
//             />
//           ))
//         )}
//         {visibleItem < filteredAndSortedProducts.length && (
//           <button style={{ fontSize: '20px', color: 'white' }} onClick={loadMore}>
//             more items
//           </button>
//         )}
//       </FlexBox>
//     </div>
//   );
// };

// export default CategoryProducts;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { filterAndSortProducts } from '../../utils/filterAndSortProducts'; 
import FilterSort from '../../ui/filterSort'; 
import { addToBasket } from '../../redux/slices/basketSlice';
import ProductCard from '../../ui/card';
import FlexBox from '../../ui/flexBox';

function CategoryProducts () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const category = categories.find(category => category.category.id === Number(id));
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

  function loadMore (){
    setVisibleItem(prevCount => prevCount + 4); 
  };

  function onClick(prodId) {
    navigate(`/category/product/${prodId}`);
  }

  if (loading) {
    return <div>Загрузка товаров...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const handleAddToCart = product => {
    dispatch(addToBasket(product));
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: '0 2.8%' }}>
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
        {visibleItem < filteredAndSortedProducts.length && (
          <button
            style={{ fontSize: '20px', color: 'white' }}
            onClick={loadMore}
          >
            more items
          </button>
        )}
      </FlexBox>
    </div>
  );
};

export default CategoryProducts;