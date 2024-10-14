import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { useEffect, useState } from 'react';
import ToggleButton from '../../ui/button';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector(state => state.categories);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleMouseEnter(categoryId) {
    setActiveCategoryId(categoryId);
  }

  function handleMouseLeave() {
    setActiveCategoryId(null);
  }

  function goToPage(categoryId) {
    navigate(`/category/${categoryId}`);
  }

  if (loading) {
    return <div>Загрузка категорий...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      {categories.map(categoryData => (
        <div
          className={styles.cardContainer}
          key={categoryData.category.id}
          onMouseEnter={() => handleMouseEnter(categoryData.category.id)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`http://localhost:3333/${categoryData.category.image}`}
            alt={categoryData.category.title}
          />
          <h3>{categoryData.category.title}</h3>

          <div className={styles.btnContaener}>
            {activeCategoryId === categoryData.category.id && (
              <ToggleButton
                initialText="Show details"
                toggledText="Show details"
                onClick={() => goToPage(categoryData.category.id)}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoriesList;

// {
//     "id": 1,
//     "title": "Dry & Wet Food",
//     "image": "/category_img/1.jpeg",
//     "createdAt": "2022-10-02T14:43:29.000Z",
//     "updatedAt": "2022-10-02T14:43:29.000Z"
//   },
