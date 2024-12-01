"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_route_1 = require("../modules/Member/member.route");
const book_route_1 = require("../modules/Book/book.route");
const brrowReturn_route_1 = require("../modules/BorrowReturn/brrowReturn.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/members",
        route: member_route_1.MemberRoute,
    },
    {
        path: "/books",
        route: book_route_1.BookRoute,
    },
    {
        path: "/",
        route: brrowReturn_route_1.BorrowReturnRoute,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
