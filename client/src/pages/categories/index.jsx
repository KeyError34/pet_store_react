import CategoriesList from '../../components/categoriesList';
import FlexBox from '../../ui/flexBox';
import NavBred from '../../ui/navRender';
function Categories() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: '0 2.8%' }}>
         <NavBred/>
        <h1 style={{ margin: '2.8% 0' }}>Categories</h1>
       
        <FlexBox>
          <CategoriesList />
        </FlexBox>
      </div>
    </div>
  );
}
export default Categories;
