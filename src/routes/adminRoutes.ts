import { Router } from "express";
import { getEvents, getAddEvent, postAddEvent, getEditEvent, postEditEvent, postDeleteEvent } from "../controllers/adminCtrl.js";

export const adminRouter = Router();

// Todas las rutas que llegan aquí empiezan por /admin

adminRouter.get('/events', getEvents);
adminRouter.get('/add-event', getAddEvent); // GET para presentar el formulario
adminRouter.post('/add-event', postAddEvent); // POST para recibir los datos del formulario
adminRouter.get('/edit-event/:eventId', getEditEvent); // GET para obtener el formulario de edición de evento
adminRouter.post('/edit-event/:eventId', postEditEvent); // POST para procesar la edición de evento
adminRouter.post('/delete-event/:eventId', postDeleteEvent); // POST para eliminar un evento
