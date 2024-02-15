import { Router } from "express";
import { getIndex, getEvents, getEventById, postCart, getCart, deleteCartItem, postCartDecreaseItem, postCartIncreaseItem, getOrders, getCheckOut } from "../controllers/shopCtrl.js";

export const shopRouter = Router();

// Usamos get y por lo tanto exige coincidencia "completa", no capa otras rutas
shopRouter.get('/', getIndex);
shopRouter.get('/events', getEvents); // Ruta para obtener todos los eventos
shopRouter.get('/events/:eventId', getEventById); // Ruta para obtener un evento por ID
shopRouter.get('/cart', getCart); // Ruta para obtener el carrito de compras
shopRouter.post('/add-to-cart', postCart); // Ruta para agregar un evento al carrito
shopRouter.post('/cart-delete-item', deleteCartItem); // Ruta para eliminar un artículo del carrito
shopRouter.post('/cart-increase-item', postCartIncreaseItem); // Ruta para aumentar la cantidad de un artículo en el carrito
shopRouter.post('/cart-decrease-item', postCartDecreaseItem); // Ruta para disminuir la cantidad de un artículo en el carrito
shopRouter.get('/checkout', getCheckOut); // Ruta para proceder al pago (checkout)
shopRouter.get('/orders', getOrders); // Ruta para obtener los pedidos del usuario
