import express from "express";
import { loginController,registerController } from "../controller/User.js";
import { requireSignIn , isAdmin} from "../middlewares/Auth.js";

const app = express.Router();

app.post('/register', registerController);
app.post('/login', loginController);
// protect routes for users
app.get('/user-auth', (req, res) => {
    res.status(200).send({ ok: true });
});
app.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default app;

