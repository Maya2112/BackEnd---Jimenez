import { productModel } from "../models/products.js";

export const getProductsService = async ({limit = 10, page = 1, sort, query})=>{
    try{
        page = page === 0 ? 1 : page;
        page = Number(page);
        limit = Number(limit);
        const skip = (page -1) * limit;
        const sortOrderOps = {'asc': -1,'desc': 1};
        sort = sortOrderOps[sort] || null;

        try{
            if (query)
                query=JSON.parse(decodeURIComponent(query));
        }catch (error){
            console.log('Query error:', error);
            query={};
        }

        const queryProducts = productModel.find(query).limit(limit).skip(skip).lean();

        if (sort !== null)
            queryProducts.sort({price: sort});

        const [products, totalDocs]= await Promise.all([queryProducts, productModel.countDocuments(query)]);
        
        const totalPages= Math.ceil(totalDocs/limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page -1 : null;
        const nextPage = hasNextPage ? page +1 : null;

        return {
            totalDocs,
            totalPages,
            limit,
            page,
            query: JSON.stringify(query),
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage,
            payload: products,
        }

    }catch (error) {
        console.log('getProductsService error:', error);
        throw error;
    }
}

export const getProductByIdService = async (pid)=>{
    try {
        return await productModel.findById(pid);
    } catch (error) {
        console.log(`getProductByIdService error: ${error}`);
        throw error;
    }
}

export const addProductService = async ({title, description, price, thumbnail, code, stock, category, status})=>{
    try {
            return await productModel.create({title, description, price, thumbnail, code, stock, category, status});
        } catch (error) {
            console.log('addPorductService error:', error);
            throw error;
        }
}

export const updateProductService = async (pid, rest)=>{
    try {
        return await productModel.findByIdAndUpdate(pid, {...rest}, {new: true});
        } catch (error) {
            console.log(`updateProductService error: ${error}`);
            throw error;
        }
}

export const deleteProductService = async (pid)=>{
    try {
        return await productModel.findByIdAndDelete(pid);
        } catch (error) {
            console.log(`deleteProductService error: ${error}`);
            throw error;
        }
}