import { NextFunction, Request, Response } from "express";

import { Product } from "../models/Product.js";
import { User } from "../models/User.js";



export const getIndex = (req: Request,res: Response,next: NextFunction) => {  
    res.render('shop/index', {pageTitle:'Tienda', path:'/'});
};

export const getProducts = async (req: Request,res: Response,next: NextFunction) => {  
    res.render('shop/product-list', 
    {
        pageTitle:'Listducta Productos', 
        path:'/products', 
        prods: await Product.fetchAll()
    });
};  

export const getProductById = async (req: Request,res: Response,next: NextFunction) => { 
    const productId = req.params.productId; 
    console.log(productId)
    const product = await Product.findById(productId);
    if(product){
         res.render('shop/product-detail', {pageTitle:product.title, path:'', product: product});
     }else{
         res.status(404).render('404.ejs',{pageTitle: 'Producto No Encontrado',path:''});    
     }
};
export const getCart = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user as User;
    const items = await user.getCart();
    //console.log(items);
    res.render('shop/cart',{
                pageTitle: 'Carro de la compra',
                path: '/cart',
                items: items,
            })
}


export const postCart = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const productId = req.body.productId;
    await user.addToCart(productId);

    console.log('postCart: Añadimos al carro el producto: ',productId);
    //Cart.addProduct(productId,1);
    res.redirect('/cart');
}

export const deleteCartItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const productId = req.body.productId;
    const result = await user.deleteCartItem(productId);
    
    res.redirect('/cart');
}


export const postCartIncreaseItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const productId = req.body.productId;
    await user.addToCart(productId);
    res.redirect('/cart');
};

export const postCartDecreaseItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const productId = req.body.productId;
    await user.decreaseCartItem(productId);
    res.redirect('/cart');
};

// export const getSaludo = (req: Request,res: Response,next: NextFunction)=>{
//     res.render('prueba',{nombre: 'Ico'});
// };
