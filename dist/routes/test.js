"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Database_1 = __importDefault(require("../shared/Database"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const router = express_1.default.Router();
router.get('/', async (req, res, next) => {
    // Check the return value when there is no corresponding data in findAll
    let users = await UserModel_1.default.findAll({ where: { name: 'Not in' } });
    console.log('users=', users); // []
    // Check the return value when there is no corresponding data in findOne
    let user = await UserModel_1.default.findOne({ where: { name: 'Not in' } });
    console.log('user=', user); // null
    // Count test
    let count = await UserModel_1.default.count({ where: { id: [1, 2, 3] } });
    console.log('count=', count);
    res.send('Hello , World');
});
router.get('/is-db-connect', async (req, res, next) => {
    const isConnect = await Database_1.default.isConnect();
    res.send(isConnect ? 'Can connect to DB.' : 'Cannot connect to DB.');
});
router.get('/:state(foo|bar)', async (req, res) => {
    console.log('req.params.state=', req.params.state);
    res.send(`State is ${req.params.state}`);
});
router.get('/error', async (req, res, next) => {
    try {
        console.log('Error action called');
        new Error('Intentionally error');
    }
    catch (err) {
        console.log('Call next function');
        next(err);
    }
});
exports.default = router;
