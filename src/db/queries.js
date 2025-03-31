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
      comments: {
        orderBy: {
          date: 'asc'
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
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

async function deletePostDB(id) {
  await prisma.posts.delete({
    where: {
      id: id
    }
  })
};
async function updatePostDB(id, image, title, text, published) {
  await prisma.posts.update({
    where: {
      id: id
    },
    data: {
      image: image,
      title: title,
      text: text,
      published: published
    }
  })
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
};

async function deleteCommentDB(id) {
  await prisma.comments.delete({
    where: {
      id: id
    }
  })
};

module.exports = {
  checkExistNicknameDB,
  createUserDB,
  getAllPostsDB,
  createPostDB,
  getPostDB,
  deletePostDB,
  updatePostDB,
  getUserByNicknameDB,
  createCommentDB,
  deleteCommentDB,
};

// async function test() {
//    const posts = await prisma.posts.findMany({})
//    console.log(posts)
// }

// test();
