import { prisma } from "../../../shared/prisma";

const borrowBook = async (bookId: string, memberId: string) => {
  const book = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.availableCopies <= 0) {
    throw new Error("No copies of the book are available for borrowing");
  }

  // Create a borrow record and update book's availableCopies
  const borrowRecord = await prisma.borrowRecord.create({
    data: {
      bookId,
      memberId,
      borrowDate: new Date(),
    },
  });

  await prisma.book.update({
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
};

const returnBook = async (borrowId: string) => {
  const borrowRecord = await prisma.borrowRecord.findUnique({
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
  const updatedRecord = await prisma.borrowRecord.update({
    where: { borrowId },
    data: {
      returnDate: new Date(),
    },
  });

  await prisma.book.update({
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
};

const getOverdueBorrowList = async () => {
  const currentDate = new Date();

  // Fetch overdue borrow records
  const overdueRecords = await prisma.borrowRecord.findMany({
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
    const overdueDays =
      Math.ceil(
        (new Date().getTime() - record.borrowDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) - 14;

    return {
      borrowId: record.borrowId,
      bookTitle: record.Book?.title,
      borrowerName: record.Member?.name,
      overdueDays,
    };
  });
};

export const BorrowReturnService = {
  borrowBook,
  returnBook,
  getOverdueBorrowList,
};
