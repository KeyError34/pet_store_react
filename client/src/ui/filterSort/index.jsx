
import CustomSelect from '../select';
import Input from '../input';
import styles from './styles.module.scss';

const FilterSort = ({
  minPrice,
  maxPrice,
  onlyDiscounted,
  selectedCategory,
  sortOrder,
  setMinPrice,
  setMaxPrice,
  setOnlyDiscounted,
  setSelectedCategory,
  setSortOrder,
  categories,
  showCategorySelect = true,
  showDiscountCheckbox = true,
}) => {
  function handleFilterChange(event) {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setOnlyDiscounted(checked);
    } else if (name === 'minPrice') {
      setMinPrice(value);
    } else if (name === 'maxPrice') {
      setMaxPrice(value);
    }
  }

  function handleSortChange(selectedOption) {
    setSortOrder(selectedOption.value);
  }

  const sortOptions = [
    { label: 'Default', value: '' },
    { label: ' Low to High', value: 'asc' },
    { label: ' High to Low', value: 'desc' },
  ];

  const selectedCategoryLabel =
    categories.find(category => category.category.id === selectedCategory)?.category.title || 'Select a category';

  return (
    <div className={styles.mainSortContainer}>
      <div className={styles.inputsContainer}>
        <p>Price</p>
        <Input
          type="number"
          name="minPrice"
          value={minPrice}
          onChange={handleFilterChange}
        />
        <Input
          type="number"
          name="maxPrice"
          value={maxPrice}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.sortContainer}>
        {showDiscountCheckbox && (
          <label>
            Discounted items
            <Input
              type="checkbox"
              name="onlyDiscounted"
              checked={onlyDiscounted}
              onChange={handleFilterChange}
            />
          </label>
        )}
        <label>
          Sorted
          <CustomSelect
            options={sortOptions}
            value={
              sortOptions.find(opt => opt.value === sortOrder) || sortOptions[0]
            }
            onChange={handleSortChange}
            placeholder="by default"
          />
        </label>
      </div>

      {showCategorySelect && (
        <div>
          <label>
            Category:
            <CustomSelect
              options={[
                { label: 'All Categories', value: '' },
                ...categories.map(category => ({
                  label: category.category.title,
                  value: category.category.id,
                })),
              ]}
              value={
                categories.find(category => category.category.id === selectedCategory) || {}
              }
              onChange={option => setSelectedCategory(option.value)}
              placeholder={selectedCategoryLabel}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterSort;