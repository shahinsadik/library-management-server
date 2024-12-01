"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/:bookId", book_controller_1.BookController.findBookById);
router.patch("/:bookId", book_controller_1.BookController.updateBook);
router.delete("/:bookId", book_controller_1.BookController.deleteBook);
exports.BookRoute = router;
