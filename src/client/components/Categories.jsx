import { useState } from "react";
import { useQuery } from "@wasp/queries";
import getCategories from "@wasp/queries/getCategories";
import createCategory from "@wasp/actions/createCategory";
import deleteCategory from "@wasp/actions/deleteCategory";
import updateCategory from "@wasp/actions/updateCategory";

import "./Categories.css";

const Categories = () => {
  const { data: categories, isFetching, error } = useQuery(getCategories);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingCategoryId, setUpdatingCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  return (
    <div className="plants-container">
      <NewCategoryForm
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        updatingCategoryId={updatingCategoryId}
        setUpdatingCategoryId={setUpdatingCategoryId}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      />
      <div className="category-container">
        {categories && (
          <CategoriesList
            categories={categories}
            setIsUpdating={setIsUpdating}
            setUpdatingCategoryId={setUpdatingCategoryId}
            setCategoryName={setCategoryName}
          />
        )}
      </div>

      {isFetching && "Fetching..."}
      {error && "Error: " + error}
    </div>
  );
};

const Category = ({
  category,
  setIsUpdating,
  setUpdatingCategoryId,
  setCategoryName,
}) => {
  const handleDelete = async () => {
    try {
      await deleteCategory({ id: category.id });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdatingCategoryId(category.id);
    setCategoryName(category.name);
  };

  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="button-row">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

const CategoriesList = ({
  categories,
  setIsUpdating,
  setUpdatingCategoryId,
  setCategoryName,
}) => {
  if (!categories?.length) return  <p>No categories</p>;
  return categories.map((category, idx) => (
    <Category
      category={category}
      key={idx}
      setIsUpdating={setIsUpdating}
      setUpdatingCategoryId={setUpdatingCategoryId}
      setCategoryName={setCategoryName}
    />
  ));
};

const NewCategoryForm = ({
  isUpdating,
  setIsUpdating,
  updatingCategoryId,
  setUpdatingCategoryId,
  categoryName,
  setCategoryName,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isUpdating) {
        await updateCategory({ id: updatingCategoryId, name: categoryName });
        setIsUpdating(false);
        setUpdatingCategoryId(null);
      } else {
        await createCategory({ name: categoryName });
      }
      setCategoryName("");
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };
  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
          <h3 className="close-btn" onClick={() => setOpenCreateCategory(prev => !prev)}>{openCreateCategory ? "x" : "Create a Category +"}</h3>
        {openCreateCategory && (
            <div className="form-section">
                 <div className="form-row">
             <div className="form-group">
                 <label htmlFor="name">Category Name:</label>
                 <input
                     name="name"
                     type="text"
                     value={categoryName}
                     placeholder="Ex. Fruits, Vegetables, Herbs, etc."
                     onChange={(e) => setCategoryName(e.target.value)}
                 />
             </div>
             <div className="form-group">
                 <button
                     style={{marginBottom: "-10px"}}
                     className="submit-btn"
                     type="submit"
                 >{isUpdating ? "Update category" : "Create category"}</button>
             </div>
             
         </div>
            </div>
            
        )}
    </form>
  );
};

export default Categories;
