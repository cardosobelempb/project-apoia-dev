import { PrismaClient } from "@/generated/prisma";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.authenticator.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  // Criar usuários
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Alice Santos",
        email: "alice@example.com",
        password: await hash("hashedpassword", 12),
        userName: "alice",
        bio: "Apaixonada por tecnologia.",
        gender: "FEMALE",
        role: "USER",
      },
      {
        name: "Bruno Costa",
        email: "bruno@example.com",
        password: await hash("hashedpassword", 12),
        userName: "brunoc",
        bio: "Desenvolvedor e criador de conteúdo.",
        gender: "MALE",
        role: "USER",
      },
      {
        name: "Carla Lima",
        email: "carla@example.com",
        password: await hash("hashedpassword", 12),
        userName: "carla_lima",
        bio: "Compartilhando conhecimento todos os dias.",
        gender: "FEMALE",
        role: "USER",
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  // Criar contas
  await prisma.account.createMany({
    data: [
      {
        userId: allUsers[0].id,
        type: "oauth",
        provider: "github",
        providerAccountId: "alice_github",
      },
      {
        userId: allUsers[1].id,
        type: "oauth",
        provider: "google",
        providerAccountId: "bruno_google",
      },
      {
        userId: allUsers[2].id,
        type: "oauth",
        provider: "discord",
        providerAccountId: "carla_discord",
      },
    ],
  });

  // Criar sessões
  await prisma.session.createMany({
    data: [
      {
        sessionToken: "token1",
        userId: allUsers[0].id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
      {
        sessionToken: "token2",
        userId: allUsers[1].id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
      {
        sessionToken: "token3",
        userId: allUsers[2].id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    ],
  });

  // Criar authenticators
  await prisma.authenticator.createMany({
    data: [
      {
        credentialID: "credid1",
        userId: allUsers[0].id,
        providerAccountId: "alice_github",
        credentialPublicKey: "pubkey1",
        counter: 1,
        credentialDeviceType: "singleDevice",
        credentialBackedUp: true,
      },
      {
        credentialID: "credid2",
        userId: allUsers[1].id,
        providerAccountId: "bruno_google",
        credentialPublicKey: "pubkey2",
        counter: 2,
        credentialDeviceType: "multiDevice",
        credentialBackedUp: false,
      },
      {
        credentialID: "credid3",
        userId: allUsers[2].id,
        providerAccountId: "carla_discord",
        credentialPublicKey: "pubkey3",
        counter: 3,
        credentialDeviceType: "singleDevice",
        credentialBackedUp: true,
      },
    ],
  });

  // Criar doações
  await prisma.donation.createMany({
    data: [
      {
        amount: 50.0,
        donarName: "João P.",
        donarMessage: "Obrigado pelo conteúdo!",
        donarStatus: "PAID",
        userId: allUsers[0].id,
      },
      {
        amount: 30.0,
        donarName: "Maria G.",
        donarMessage: "Continue com o ótimo trabalho.",
        donarStatus: "PENDING",
        userId: allUsers[1].id,
      },
      {
        amount: 70.0,
        donarName: "Carlos M.",
        donarMessage: "Muito útil!",
        donarStatus: "PAID",
        userId: allUsers[2].id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed concluído com sucesso.");
  })
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
