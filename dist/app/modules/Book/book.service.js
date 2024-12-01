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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = require("../../../shared/prisma");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.create({
        data,
    });
    return result;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.prisma.book.findMany();
    return books;
});
const findBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield prisma_1.prisma.book.findUniqueOrThrow({
            where: { bookId },
        });
        return book;
    }
    catch (error) {
        throw new Error("Book not found");
    }
});
const updateBook = (bookId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.book.findUniqueOrThrow({
            where: { bookId },
        });
        const result = yield prisma_1.prisma.book.update({
            where: { bookId },
            data,
        });
        return result;
    }
    catch (error) {
        throw new Error("Book not found or update failed");
    }
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.book.delete({
            where: { bookId },
        });
    }
    catch (error) {
        throw new Error("Book not found or delete failed");
    }
});
exports.BookService = {
    createBook,
    getAllBooks,
    findBookById,
    updateBook,
    deleteBook
};
