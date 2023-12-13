export const ProductItem = ({inStock,productImg,productTitle, productPrice, productColors, onClick })=>{
    return(
        <div>
            <div onClick={onClick} className='product-item bg-slate-50 relative duration-300  rounded-md h-56 shadow-lg overflow-hidden flex justify-center cursor-pointer hover:scale-105'>
                <img src={productImg} className="w-full h-full object-cover" alt="white hoodie" />
                <div className={`availability absolute top-0 right-0 text-sm ${inStock? ' bg-green-800' : ' bg-red-700'} px-2 py-1 text-white translate-x-[120%] duration-300 ease-in`}>{inStock? 'In Stock' : 'Out Stock'}</div>
                <div className='product-data absolute bottom-0 w-full text-center p-2 bg-gray-700 opacity-80 text-white font-bold translate-y-full duration-300 ease-out'>
                    <div className="title">{productTitle}</div>
                    <div className="price">{productPrice} EGP</div>
                    <div className="colors pt-1 flex gap-2 justify-center">
                        {productColors.map((color,index)=> <div key={index} className={`bg-${color} rounded-full h-3 w-3`}></div>)}
                    </div>
                </div>
            </div>
         

        </div>

    );
}