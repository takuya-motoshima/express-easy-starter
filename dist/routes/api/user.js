"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserModel_1 = __importDefault(require("~/models/UserModel"));
const UserAuthentication_1 = __importDefault(require("~/authentication/UserAuthentication"));
const router = express_1.default.Router();
router.put('/:id(\\d+)', async (req, res, next) => {
    if (req.body.changePassword) {
        const isPasswordCorrect = await UserModel_1.default.isPasswordCorrect(req.params.id, req.body.password);
        if (!isPasswordCorrect)
            return void res.json({ error: 'wrongPassword' });
    }
    const set = { name: req.body.name };
    if (req.body.changePassword)
        set.password = req.body.newPassword;
    await UserModel_1.default.update(set, { where: { id: req.params.id } });
    res.json(true);
});
router.post('/login', async (req, res, next) => {
    const isSuccess = await UserAuthentication_1.default.signin(req, res, next);
    res.json(isSuccess);
});
router.get('/logout', async (req, res, next) => {
    UserAuthentication_1.default.signout(req, res, next);
    res.redirect('/');
});
exports.default = router;
