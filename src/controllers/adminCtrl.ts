import { Request,Response, NextFunction } from "express";

import { Event } from "../models/Event.js";


export const getEvents = async (req: Request,res:Response) => {  
    res.render('admin/events', {
        pageTitle:'Admin Events', 
        path:'/admin/events', 
        prods: await Event.fetchAll()});
};

export const getAddEvent = (req: Request,res: Response,next: NextFunction)=>{
    console.log("Devolvemos el formulario para meter eventos");
    res.render('admin/edit-event',{pageTitle: "Formulario", path: "/admin/add-event", editing: false});
};
export const postAddEvent = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const imageUrl =  req.body.imageUrl;
    const description = req.body.description;
    console.log(description);
    const price = +req.body.price;
    if(req.body.title){
        const event = new Event(
            title,
            imageUrl,
            description,
            price
        );
        await event.save();
    }
    res.redirect('/events');
}


export const getEditEvent = async (req: Request,res: Response,next: NextFunction)=>{
    console.log("getEdtitEvent: Devolvemos el formulario para editar eventos");
    const editMode = req.query.edit === 'true';
    if(!editMode){
        return res.redirect('/events');
    }
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if(event){
        res.render('admin/edit-event',
        {
            pageTitle: "Formulario edición", 
            path: "/admin/add-event", //Ebtrada de la barra de navegación que vamos a sombrear    
            editing: editMode,
            event: event
        });
    }else{
        res.redirect('/events');
    }
};
export const postEditEvent = async (req: Request,res: Response,next: NextFunction)=>{
    const eventId = req.body.eventId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price =  +req.body.price;
    const event = new Event(title, imageUrl, description, price, eventId);
    console.log(event);
    await event.save();
    res.redirect('/admin/events');
}


export const postDeleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = parseInt(req.params.eventId); // Convertir la cadena a número
    try {
        await Event.deleteById(eventId); 
        res.redirect('/admin/events'); 
    } catch (error) {
        console.error("Error al eliminar el evento:", error);
        res.redirect('/admin/events'); 
    }

}


