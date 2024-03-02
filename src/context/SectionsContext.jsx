import { createContext, useState, useContext } from "react";
import { categoriesList,brandsList } from "../data/sectionsData";
import ProductsContext from "./ProductsContext";
import { useActivityContext } from "./ActivityContext";

const SectionsContext = createContext();

export const SectionsProvider = ({children}) =>{
    const {addNewActivity} = useActivityContext();
    const { productsData,setProductsData } = useContext(ProductsContext);
    const [ categorySection, setCategorySection ] = useState([...categoriesList]);
    const [ brandsSection, setBrandsSection ] = useState([...brandsList]);

    const addNewSection = ()=>{

    }

    const modifyCategory = (catId,oldCatName,modifiedName)=>{
        //change in section Data
        const catArray = [...categorySection];
        const catIndex = catArray.map(cat=>cat.id).indexOf(catId);
        catArray[catIndex].title = modifiedName;
        const newSectionPath = modifiedName.replace(/\s/g, '');
        catArray[catIndex].path = newSectionPath;
        setCategorySection(catArray);
        //change in products Data
        const prodsArray = [...productsData];
        prodsArray.filter(prod=>prod.prodCat.text === oldCatName).forEach(prod=> {
            prod.prodCat.text = modifiedName;
            prod.prodCat.value = newSectionPath;
        });
        setProductsData(prodsArray);
        addNewActivity('modifySeciton',`Modified ${oldCatName} category's name to ${modifiedName}`);
    }

    const modifyBrand = (brandId,oldBrandName,modifiedName) =>{
        //change in section Data
        const brandArray = [...brandsSection];
        const brandIndex = brandArray.map(brand=>brand.id).indexOf(brandId);
        brandArray[brandIndex].title = modifiedName;
        const newSectionPath = modifiedName.replace(/\s/g, '');
        brandArray[brandIndex].path = newSectionPath;
        setBrandsSection(brandArray);
        //change in products Data
        const prodsArray = [...productsData];
        prodsArray.filter(prod=>prod.prodBrand.text === oldBrandName).forEach(prod=> {
            prod.prodBrand.text = modifiedName;
            prod.prodBrand.value = newSectionPath;
        });
        setProductsData(prodsArray);
        addNewActivity('modifySeciton',`Modified ${oldBrandName} brand's name to ${modifiedName}`);
    }

    const deleteCategorySection = (catId) => {
        const catArray = [...categorySection];
        const catIndex = catArray.map(cat=>cat.id).indexOf(catId);
        setCategorySection(catArray.filter(cat=>cat.id !== catId));
        addNewActivity('deleteSection',`Deleted ${catArray[catIndex].title} category.`);
    }
    const deleteBrandSection = (brandId) => {
        const brandArray = [...brandsSection];
        const brandIndex = brandArray.map(brand=>brand.id).indexOf(brandId);
        setBrandsSection(brandArray.filter(brand=>brand.id !== brandId));
        addNewActivity('deleteSection',`Deleted ${brandArray[brandIndex].title} brand.`);
    } 
    const valueToShare = {
        categorySection,
        brandsSection,
        addNewSection,
        modifyCategory,
        modifyBrand,
        deleteCategorySection,
        deleteBrandSection
    }
    return <SectionsContext.Provider value={valueToShare}>
        {children}
    </SectionsContext.Provider>
}

export default SectionsContext;