import { Book } from "@prisma/client";
import { prisma } from "../../../shared/prisma"; 

const createBook = async (data: any): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllBooks = async (): Promise<Book[]> => {
  const books = await prisma.book.findMany();
  return books;
};

const findBookById = async (bookId: string): Promise<Book | null> => {
  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: { bookId },
    });
    return book;
  } catch (error) {
    throw new Error("Book not found");
  }
};

const updateBook = async (bookId: string, data: Partial<Book>): Promise<Book> => {
  try {
    await prisma.book.findUniqueOrThrow({
      where: { bookId },
    });
    const result = await prisma.book.update({
      where: { bookId },
      data,
    });
    return result;
  } catch (error) {
    throw new Error("Book not found or update failed");
  }
};

const deleteBook = async (bookId: string): Promise<void> => {
  try {
    await prisma.book.delete({
      where: { bookId },
    });
  } catch (error) {
    throw new Error("Book not found or delete failed");
  }
}

export const BookService = {
  createBook,
  getAllBooks,
  findBookById,
  updateBook,
  deleteBook
};
