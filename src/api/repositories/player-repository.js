const { Player } = require("../../../models");
const createError = require("http-errors");
const { Sequelize, Op } = require("sequelize");
const { dbo } = require("../../config/constants");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

async function findPlayerById(id) {
  const object = await Player.findByPk(id);
  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findPlayerByCode(code) {
  const object = await Player.findOne({
    where: {
      code: code,
    },
  });
  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findPlayerByEmail(email) {
  const object = await Player.findOne({
    where: {
      email: email,
    },
  });
  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findPlayerByPhone(phone) {
  const object = await Player.findOne({
    where: {
      phone_number: phone,
    },
  });

  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findPlayerByUsername(username) {
  const object = await Player.findOne({
    where: {
      username: username,
    },
  });
  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findPlayerByStatusCode(code, status) {
  const object = await Player.findOne({
    where: {
      code: code,
      status: status,
    },
  });
  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findPlayerByStatusId(id, status) {
  const object = await Player.findOne({
    where: {
      id: id,
      status: status,
    },
  });
  if (!(object instanceof Player)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

async function findAndCountPlayersByStatus(stauts) {
  const object = await Player.findAndCountAll({
    where: {
      status: status,
    },
  });
  return object;
} //typescript should help (when rewriting)

async function playerWithEmailExists(email) {
  try {
    const player = await findPlayerByEmail(email);

    if (player === null) {
      return true;
    } else if (player instanceof Player) {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function playerWithUsernameExists(username) {
  try {
    const player = await findPlayerByUsername(username);

    if (player === null) {
      return true;
    } else if (player instanceof Player) {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function playerWithPhoneExists(phone) {
  try {
    const player = await findPlayerByPhone(phone);

    if (player === null) {
      return true;
    } else if (player instanceof Player) {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @CRUD
 * @param {*} body
 * @returns Promise<Player>
 */
async function createPlayer(body) {
  return await Player.create(body);
}

async function playerWithAnyUniqueDetailExists(email, phone, username) {
  const object = await Player.findOne({
    where: {
      [Op.or]: [
        { email: email },
        { phone_number: phone },
        { username: username },
      ],
    },
  });
  let matchedParam;
  if (object instanceof Player) {
    if (object.email === email) {
      matchedParam = "email";
    } else if (object.username === username) {
      matchedParam = "username";
    } else matchedParam = "phone number";
    return { matched: true, matchedParam: matchedParam };
  }
  if (object === null) {
    return { matched: false, matchedParam: undefined };
  }

  return object;
}

module.exports = {
  findPlayerById,
  findPlayerByCode,
  findPlayerByStatusCode,
  findPlayerByStatusId,
  findAndCountPlayersByStatus,
  findPlayerByEmail,
  findPlayerByPhone,
  findPlayerByUsername,
  playerWithEmailExists,
  playerWithUsernameExists,
  playerWithPhoneExists,
  playerWithAnyUniqueDetailExists,
  createPlayer,
};
