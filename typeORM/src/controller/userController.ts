import {Request, Response} from "express";
import userService from "../service/userService";

class UserController {

    private userService;
    constructor() {
        this.userService = userService;
    }

    showFormLogin = async (req: Request, res: Response) => {
        res.render('users/login');
    }

    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkUser(req.body);
        if(!user) {
            res.redirect(301, '/users/login')
        } else {
            req.session['user'] = user;
            res.redirect(301, '/products');
        }
    }

}

export default new UserController();