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
exports.BorrowReturnService = void 0;
const prisma_1 = require("../../../shared/prisma");
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.prisma.book.findUnique({
        where: { bookId },
    });
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.availableCopies <= 0) {
        throw new Error("No copies of the book are available for borrowing");
    }
    // Create a borrow record and update book's availableCopies
    const borrowRecord = yield prisma_1.prisma.borrowRecord.create({
        data: {
            bookId,
            memberId,
            borrowDate: new Date(),
        },
    });
    yield prisma_1.prisma.book.update({
        where: { bookId },
        data: {
            availableCopies: {
                decrement: 1,
            },
        },
    });
    return {
        borrowId: borrowRecord.borrowId,
        bookId,
        memberId,
        borrowDate: borrowRecord.borrowDate,
    };
});
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowRecord = yield prisma_1.prisma.borrowRecord.findUnique({
        where: { borrowId },
        include: { Book: true },
    });
    if (!borrowRecord) {
        throw new Error("Borrow record not found");
    }
    if (borrowRecord.returnDate) {
        throw new Error("This book has already been returned");
    }
    // Update the borrow record and increment availableCopies
    const updatedRecord = yield prisma_1.prisma.borrowRecord.update({
        where: { borrowId },
        data: {
            returnDate: new Date(),
        },
    });
    yield prisma_1.prisma.book.update({
        where: { bookId: borrowRecord.bookId },
        data: {
            availableCopies: {
                increment: 1,
            },
        },
    });
    return {
        borrowId: updatedRecord.borrowId,
        bookId: borrowRecord.bookId,
        returnDate: updatedRecord.returnDate,
    };
});
const getOverdueBorrowList = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    // Fetch overdue borrow records
    const overdueRecords = yield prisma_1.prisma.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lte: new Date(currentDate.setDate(currentDate.getDate() - 14)), // 14 days overdue
            },
        },
        include: {
            Book: {
                select: { title: true },
            },
            Member: {
                select: { name: true },
            },
        },
    });
    if (overdueRecords.length === 0) {
        return [];
    }
    // Map overdue data to include overdue days
    return overdueRecords.map((record) => {
        var _a, _b;
        const overdueDays = Math.ceil((new Date().getTime() - record.borrowDate.getTime()) /
            (1000 * 60 * 60 * 24)) - 14;
        return {
            borrowId: record.borrowId,
            bookTitle: (_a = record.Book) === null || _a === void 0 ? void 0 : _a.title,
            borrowerName: (_b = record.Member) === null || _b === void 0 ? void 0 : _b.name,
            overdueDays,
        };
    });
});
exports.BorrowReturnService = {
    borrowBook,
    returnBook,
    getOverdueBorrowList,
};
