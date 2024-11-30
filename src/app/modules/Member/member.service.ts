import { Member } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createMember = async (data: any) => {
  console.log("userData", data);

  const userData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    membershipDate: data.membershipDate || new Date(),
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdMember = await transactionClient.member.create({
      data: userData,
    });

    return createdMember;
  });

  return result;
};

const getAllMembers = async () => {
  const members = await prisma.member.findMany();
  return members;
};

const findMemberById = async (memberId: string) => {
  const member = await prisma.member.findUniqueOrThrow({
    where: { memberId },
  });
  return member;
}

const updateMember = async (memberId: string, data: Partial<Member>) => {
  await prisma.member.findUniqueOrThrow({
    where: { memberId },
  });
  const result = await prisma.member.update({
    where: { memberId },
    data,
  });
  return result;
};

const deleteMember = async (memberId: string) => {
  await prisma.member.findUniqueOrThrow({
    where: { memberId },
  });
  const result = await prisma.member.delete({
    where: { memberId },
  });
  return result;
}

export const MemberService = {
  createMember,
  getAllMembers,
  updateMember,findMemberById, deleteMember
};
