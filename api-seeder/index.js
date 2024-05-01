const axios = require("axios");

async function getAllUsers() {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    console.error("Error getting all users:", error.code);
    return null;
  }
}

async function seedUser(userData) {
  try {
    const response = await axios.post("http://localhost:3000/users", userData);
    return response.data.id;
  } catch (error) {
    console.error("Error seeding user:", error.code);
    return null;
  }
}

async function sendFollowUsers(followData) {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/follow",
      followData
    );
  } catch (error) {
    console.error("Error seeding follow:", error.code);
    return null;
  }
}

async function seedMediaForUser(userId, mediaData) {
  try {
    mediaData.userId = userId;
    const response = await axios.post(
      "http://localhost:3000/medias",
      mediaData
    );
  } catch (error) {
    console.error("Error seeding media for user", userId, ":", error.code);
  }
}

async function seedData() {
  const userCount = 50;
  const mediasPerUserCount = 35;
  const userFollowsPerUser = 10;

  let startUserId = 0;

  const alreadyRegisteredUsers = await getAllUsers();

  if (alreadyRegisteredUsers.length > 0) {
    const lastUser = alreadyRegisteredUsers.reduce((max, current) => {
      return current.id > max.id ? current : max;
    });
    startUserId = parseInt(lastUser.id);
  }

  const users = [];

  const userTemplate = {
    username: "john",
    email: "john@example.com",
    description: "Hello, I'm John",
    profilePictureURL: "http://dns.com/johnprofilepic",
  };

  for (let i = 1; i <= userCount; i++) {
    const user = { ...userTemplate };
    user.username = user.username + startUserId + i;
    user.email = user.email.replace("@", `_${startUserId + i}@`);
    user.description = `Hello, I'm ${user.username}`;
    user.profilePictureURL = `http://dns.com/${user.username}profilepic`;
    users.push(user);
  }

  const medias = [];

  const mediaTemplate = {
    title: "My Media",
    description: "media",
    URL: "http://dns.com/media",
    userId: null,
  };

  for (let i = 1; i <= mediasPerUserCount; i++) {
    const media = { ...mediaTemplate };
    media.title = media.title + i;
    media.description = `Media ${i}`;
    media.URL = `http://dns.com/media${i}`;
    media.userId = null;
    medias.push(media);
  }

  const userIds = [];

  const start = performance.now();
  for (const userData of users) {
    const userId = await seedUser(userData);
    if (userId) {
      userIds.push(userId);
      for (const mediaData of medias) {
        await seedMediaForUser(userId, mediaData);
      }
      console.log(`User ${userId} seeded with ${medias.length} medias`);
    }
  }

  const followersData = [];

  for (const userId of userIds) {
    const following = [];
    for (let i = 0; i < userFollowsPerUser; i++) {
      let randomUserId;
      do {
        randomUserId = userIds[getRandomNumber(0, userIds.length - 1)];
      } while (randomUserId === userId || following.includes(randomUserId));
      following.push(randomUserId);
    }
    followersData.push({ userId, following });
  }

  for (const followData of followersData) {
    for (const follower of followData.following) {
      await sendFollowUsers({
        selfId: followData.userId,
        userToFollowId: follower,
      });
    }
    console.log(
      `User ${followData.userId} follow users: [${followData.following.join(
        ", "
      )}]`
    );
  }
  const end = performance.now();
  console.log(
    `--- Seeded ${userIds.length} users / ${
      mediasPerUserCount * userIds.length
    } medias / ${userFollowsPerUser * userIds.length} follows, in ${(
      end - start
    ).toFixed(3)} ms`
  );
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

seedData();
