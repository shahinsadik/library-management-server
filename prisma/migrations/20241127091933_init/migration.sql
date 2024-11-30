-- CreateTable
CREATE TABLE "member" (
    "memberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "membershipDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "book" (
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "totalCopies" INTEGER NOT NULL,
    "availableCopies" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "borrow_record" (
    "borrowId" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "bookId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "borrow_record_pkey" PRIMARY KEY ("borrowId")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- AddForeignKey
ALTER TABLE "borrow_record" ADD CONSTRAINT "borrow_record_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow_record" ADD CONSTRAINT "borrow_record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
