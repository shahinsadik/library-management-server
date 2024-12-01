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
exports.MemberService = void 0;
const prisma_1 = require("../../../shared/prisma");
const createMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userData", data);
    const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        membershipDate: data.membershipDate || new Date(),
    };
    const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createdMember = yield transactionClient.member.create({
            data: userData,
        });
        return createdMember;
    }));
    return result;
});
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prisma_1.prisma.member.findMany();
    return members;
});
const findMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.prisma.member.findUniqueOrThrow({
        where: { memberId },
    });
    return member;
});
const updateMember = (memberId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.member.findUniqueOrThrow({
        where: { memberId },
    });
    const result = yield prisma_1.prisma.member.update({
        where: { memberId },
        data,
    });
    return result;
});
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.member.findUniqueOrThrow({
        where: { memberId },
    });
    const result = yield prisma_1.prisma.member.delete({
        where: { memberId },
    });
    return result;
});
exports.MemberService = {
    createMember,
    getAllMembers,
    updateMember, findMemberById, deleteMember
};
