import { NextFunction, Request, Response } from "express";

import { Event } from "../models/Event.js";
import { User } from "../models/User.js";



export const getIndex = (req: Request,res: Response,next: NextFunction) => {  
    res.render('shop/index', {pageTitle:'Tienda', path:'/'});
};

export const getEvents = async (req: Request,res: Response,next: NextFunction) => {  
    res.render('shop/event-list', 
    {
        pageTitle:'Lista Eventos', 
        path:'/events', 
        events: await Event.fetchAll()
    });
};  

export const getEventById = async (req: Request,res: Response,next: NextFunction) => { 
    const eventId = req.params.eventId; 
    console.log(eventId)
    const event = await Event.findById(eventId);
    if(event){
         res.render('shop/event-detail', {pageTitle:event.title, path:'', event: event});
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


export const postCart = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const eventId = req.body.eventId; 
    await user.addToCart(eventId);

    console.log('postCart: Añadimos al carro el evento: ', eventId);
    res.redirect('/cart');
}


export const deleteCartItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const eventId = req.body.eventId;
    const result = await user.deleteCartItem(eventId);
    
    res.redirect('/cart');
}


export const postCartIncreaseItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const eventId = req.body.eventId;
    await user.addToCart(eventId);
    res.redirect('/cart');
};

export const postCartDecreaseItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const eventId = req.body.eventId;
    await user.decreaseCartItem(eventId);
    res.redirect('/cart');
};
export const getOrders = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    const orders = await user.getOrders();
    res.render('shop/orders', {
        pageTitle:'Orders',
        path:'/orders',
        user: {name: user.name, DNI: user.DNI},
        orders: orders,
    });
}
export const getCheckOut = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user;
    try{
        const result = await user.addOrder();
        result 
            ? console.log("Orden añadida: ", result)
            : console.log("Error en la order");
    }catch(err){
        console.log(err);
    }finally{
        res.redirect('/orders');
    }
}

// export const getSaludo = (req: Request,res: Response,next: NextFunction)=>{
//     res.render('prueba',{nombre: 'Ico'});
// };
