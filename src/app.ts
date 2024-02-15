import express from "express";
import * as dotenv from 'dotenv';

import { User } from "./models/User.js";
import { collections, connectToDatabase } from "./services/databaseService.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { shopRouter } from "./routes/shopRoutes.js";

console.log("Bienvenido a mi app");
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

connectToDatabase()
.then(async () => {
    const user = new User('123456789', 'Mateo', 'mateo@a.com', {calle: 'a', telf: '555', CP: '46000'});
    await user.save();
})
.then(() => {
    app.use(express.json()); // Middleware para parsear JSON en las solicitudes

    // Middleware para simular usuario loggeado
    app.use(async (req, res, next) => {
        const user = await collections.users?.findOne({'DNI': '123456789'});
        req.body.user = new User(user!.DNI, user!.name, user!.mail, user!.contacto, user!.cart, user!._id.toHexString()); 
        next();  
    });

    app.use('/admin', adminRouter); // Las rutas comienzan con /admin
    app.use('/', shopRouter);

    app.use('/', (req, res, next) => {
        res.status(404).json({error: "Página no encontrada"}); // Manejo de ruta no encontrada
    });

    app.listen(port, () => {
        console.log("Servidor de la app en marcha");
        console.log(`Página disponible en: http://localhost:${port}`);
    });
})
.catch((error) => {
    console.error(error);
});

console.log('---- FIN del Programa -----');

