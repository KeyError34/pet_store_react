// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCategories } from '../../redux/slices/categoriesSlice';
// import { useNavigate } from 'react-router-dom';
// import { filterAndSortProducts } from '../../utils/filterAndSortProducts';

// const DiscountList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { categories, loading, error } = useSelector(state => state.categories);

//   const [sortOrder, setSortOrder] = useState('default');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(''); // Для фильтрации по категориям

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Загрузка...</div>;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

//   if (!categories || categories.length === 0) {
//     return <div>Нет доступных категорий</div>;
//   }

//   // Извлекаем все продукты из категорий
//   const allProducts = categories.flatMap(category => category.data);

//   // Применяем фильтрацию и сортировку с помощью утилиты
//   const filteredAndSortedProducts = filterAndSortProducts(allProducts, {
//     minPrice: minPrice !== '' ? parseFloat(minPrice) : '', // Проверка на пустое значение
//     maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : '',
//     selectedCategory,
//     sortOrder
//   });

//   return (
//     <div>
//       <h2>Продукты со скидкой</h2>

//       <div>
//         <label>
//           Мин. цена:
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             placeholder="Введите минимальную цену"
//           />
//         </label>
//         <label>
//           Макс. цена:
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             placeholder="Введите максимальную цену"
//           />
//         </label>
//       </div>

//       <div>
//         <label>
//           Категория:
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">Все категории</option>
//             {categories.map(category => (
//               <option key={category.category.id} value={category.category.id}>
//                 {category.category.title}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Сортировать по:
//           <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="default">По умолчанию</option>
//             <option value="asc">Цена: от меньшего к большему</option>
//             <option value="desc">Цена: от большего к меньшему</option>
//           </select>
//         </label>
//       </div>

//       {filteredAndSortedProducts.length === 0 ? (
//         <div>Нет доступных продуктов</div>
//       ) : (
//         filteredAndSortedProducts.map(product => (
//           <div
//             key={product.id}
//             style={{
//               border: '1px solid black',
//               margin: '10px',
//               padding: '10px',
//               cursor: 'pointer',
//             }}
//             onClick={() => navigate(`/category/product/${product.id}`)}
//           >
//             <h3>{product.title || 'Нет названия'}</h3>
//             <p>Цена: ${product.price}</p>
//             {product.discount_price && (
//               <p style={{ textDecoration: 'line-through' }}>
//                 Скидочная цена: ${product.discount_price}
//               </p>
//             )}
//             <p>{product.description || 'Нет описания'}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DiscountList;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { addToBasket } from '../../redux/slices/basketSlice';
import { useNavigate } from 'react-router-dom';
import { filterAndSortProducts } from '../../utils/filterAndSortProducts';
import FilterSort from '../../ui/filterSort'; 
import FlexBox from '../../ui/flexBox';
import ProductCard from '../../ui/card';

function DiscountList  (){
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>Нет доступных категорий</div>;
  }

  const allProducts = categories.flatMap(category => category.data);
  const filteredAndSortedProducts = filterAndSortProducts(allProducts, filters);

  function loadMore (){setVisibleItem(prevCount => prevCount + 4);
}
  function handleAddToCart(product){
    dispatch(addToBasket(product));
  };

  function handleProductClick( prodId)  {
    navigate(`/category/product/${prodId}`);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: '0 2.8%' }}>
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
        />
      </div>
      <FlexBox>
        {filteredAndSortedProducts.length === 0 ? (
          <div>Нет доступных продуктов</div>
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
                onClick={() => handleProductClick(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
        )}
      </FlexBox>

      {visibleItem < filteredAndSortedProducts.length && (
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}
        >
          <span
            style={{ cursor: 'pointer', padding: '5px 8px' }}
            onClick={loadMore}
          >
            больше товаров...
          </span>
        </div>
      )}
    </div>
  );
};

export default DiscountList;