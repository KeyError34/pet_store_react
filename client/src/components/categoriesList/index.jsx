import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import ProductCard from '../../ui/card'; 

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка категорий...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      {categories.map(categoryData => (
        <ProductCard
          key={categoryData.category.id}
          title={categoryData.category.title}
          image={`http://localhost:3333/${categoryData.category.image}`}
          price={null}
          discont_price={null}
          navigatePath={`/category/${categoryData.category.id}`} 
          initialText="Show details"
          toggledText="Show details"
          isCategoryButton={true} 
        />
      ))}
    </>
  );
};

export default CategoriesList;