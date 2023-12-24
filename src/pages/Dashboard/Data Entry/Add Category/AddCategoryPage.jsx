import { AddCategoryForm } from '../../../../components/dashboard/Add Items/AddCategory/AddCategoryForm';
import { AddBrandForm } from '../../../../components/dashboard/Add Items/AddCategory/AddBrandForm';

export const AddCategoryPage = ()=>{
    return(
        <div className="flex flex-col gap-4">
            <AddCategoryForm />
            <AddBrandForm />
        </div>
    );
}