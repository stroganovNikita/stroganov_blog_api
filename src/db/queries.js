const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function checkExistNicknameDB(nickname) {
  const user = await prisma.user.findMany({
    where: {
      nickname: nickname,
    },
  });
  return user;
}

async function createUserDB(firstname, lastname, nickname, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      password: hashedPassword,
    },
  });
}

async function getAllPostsDB() {
  const posts = await prisma.posts.findMany({
    include: {
      comments: true,
    },
  });
  return posts;
}

async function createPostDB(title, text, image) {
  await prisma.posts.create({
    data: {
      date: new Date(),
      title: title,
      text: text,
      image: image,
    },
  });
}

async function getPostDB(id) {
  return await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });
}

async function getUserByNicknameDB(nickname) {
  const user = await prisma.user.findMany({
    where: {
      nickname: nickname,
    },
  });
  return user;
}

async function createCommentDB(text, authorname, postId, date) {
  await prisma.comments.create({
    data: {
      text: text,
      authorname: authorname,
      postId: postId,
      date: date,
    },
  });
}

module.exports = {
  checkExistNicknameDB,
  createUserDB,
  getAllPostsDB,
  createPostDB,
  getPostDB,
  getUserByNicknameDB,
  createCommentDB,
};

// async function test() {
//   const comment = await prisma.comments.findMany({})
//   console.log(comment)
// }

// test();
