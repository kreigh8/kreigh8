"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClient = exports.getClients = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = __importDefault(require("../models/client"));
const getClients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_1.default.find().exec();
        res.status(200).json(clients);
    }
    catch (error) {
        next(error);
    }
});
exports.getClients = getClients;
const getClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.clientId;
    try {
        if (!mongoose_1.default.isValidObjectId(clientId)) {
            throw (0, http_errors_1.default)(400, 'Invalid client id');
        }
        const client = yield client_1.default.findById(clientId).exec();
        if (!client) {
            throw (0, http_errors_1.default)(404, 'Client not found');
        }
        res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
});
exports.getClient = getClient;
const createClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const active = req.body.active;
    try {
        if (!name) {
            throw (0, http_errors_1.default)(400, 'Client must have a name');
        }
        if (typeof active !== 'boolean') {
            throw (0, http_errors_1.default)(400, 'Active must be type boolean');
        }
        const newClient = yield client_1.default.create({
            name: name,
            description: description,
            active: active
        });
        res.status(201).json(newClient);
    }
    catch (error) {
        next(error);
    }
});
exports.createClient = createClient;
const updateClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.clientId;
    const newName = req.body.name;
    const newDescription = req.body.description;
    const newActive = req.body.active;
    try {
        if (!mongoose_1.default.isValidObjectId(clientId)) {
            throw (0, http_errors_1.default)(400, 'Invalid client id');
        }
        if (!newName) {
            throw (0, http_errors_1.default)(400, 'Client must have a name');
        }
        if (typeof newActive !== 'boolean') {
            throw (0, http_errors_1.default)(400, 'Active must be type boolean');
        }
        const client = yield client_1.default.findById(clientId).exec();
        if (!client) {
            throw (0, http_errors_1.default)(404, 'Client not found');
        }
        client.name = newName;
        client.description = newDescription;
        client.active = newActive;
        const updatedClient = yield client.save();
        res.status(200).json(updatedClient);
    }
    catch (error) {
        next(error);
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.clientId;
    try {
        if (!mongoose_1.default.isValidObjectId(clientId)) {
            throw (0, http_errors_1.default)(400, 'Invalid client id');
        }
        const client = yield client_1.default.findById(clientId).exec();
        if (!client) {
            throw (0, http_errors_1.default)(404, 'Client not found');
        }
        client_1.default.findByIdAndDelete(clientId);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteClient = deleteClient;
//# sourceMappingURL=clients.js.map