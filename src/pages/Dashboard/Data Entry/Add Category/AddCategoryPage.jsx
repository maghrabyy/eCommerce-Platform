import { AddCategoryForm } from '../../../../components/dashboard/Add Items/AddSection/AddCategoryForm';
import { AddBrandForm } from '../../../../components/dashboard/Add Items/AddSection/AddBrandForm';

export const AddCategoryPage = ()=>{
    return(
        <div className="flex flex-col gap-4">
            <AddCategoryForm />
            <AddBrandForm />
        </div>
    );
}