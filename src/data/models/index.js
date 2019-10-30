import sequelize from '../sequelize';
import User from './User';
import Bet from './Bet';
import Lot from './Lot';
import Notification from './Notification';
import NotificationToUser from './NotificationToUser';
import Room from './Room';
import RoomToUser from './RoomToUser';
import UserSession from './UserSession';

User.hasMany(Bet, {
  foreignKey: 'userId',
  as: 'bets',
});

Bet.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner',
});

User.hasOne(UserSession, {
  foreignKey: 'userId',
  as: 'session',
});

User.hasMany(Lot, {
  foreignKey: 'ownerId',
  as: 'lots',
});

Lot.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner',
});

User.hasMany(Lot, {
  foreignKey: 'purchaserId',
  as: 'lots',
});

Lot.belongsTo(User, {
  foreignKey: 'purchaserId',
  as: 'purchaser',
});

Lot.hasMany(Bet, {
  foreignKey: 'lotId',
  as: 'bets',
});

Bet.belongsTo(Lot, {
  foreignKey: 'lotId',
  as: 'lot',
});

Room.hasOne(Lot, {
  foreignKey: 'roomId',
  as: 'lot',
});

Lot.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'room',
});

User.belongsToMany(Notification, {
  through: NotificationToUser,
  as: 'notifications',
  foreignKey: 'userId',
  otherKey: 'notificationId',
});

Notification.belongsToMany(User, {
  through: NotificationToUser,
  as: 'users',
  foreignKey: 'notificationId',
  otherKey: 'userId',
});

User.belongsToMany(Room, {
  through: RoomToUser,
  as: 'rooms',
  foreignKey: 'userId',
  otherKey: 'roomId',
});

Room.belongsToMany(User, {
  through: RoomToUser,
  as: 'users',
  foreignKey: 'roomId',
  otherKey: 'userId',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  User,
  RoomToUser,
  Notification,
  NotificationToUser,
  UserSession,
  Bet,
  Lot,
  Room,
};
