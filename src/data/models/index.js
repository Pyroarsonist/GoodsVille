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
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Bet.belongsTo(User, {
  foreignKey: 'userId',
  as: 'ownerBet',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserSession, {
  foreignKey: 'userId',
  as: 'session',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserSession.belongsTo(User, {
  foreignKey: 'userId',
  as: 'session',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(Lot, {
  foreignKey: 'ownerId',
  as: 'ownedLots',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Lot.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'ownerLot',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(Lot, {
  foreignKey: 'purchaserId',
  as: 'purchasedLots',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Lot.belongsTo(User, {
  foreignKey: 'purchaserId',
  as: 'purchaserLot',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Lot.hasMany(Bet, {
  foreignKey: 'lotId',
  as: 'bets',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Bet.belongsTo(Lot, {
  foreignKey: 'lotId',
  as: 'bet',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Room.hasOne(Lot, {
  foreignKey: 'roomId',
  as: 'lot',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Lot.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'lot',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.belongsToMany(Notification, {
  through: NotificationToUser,
  as: 'users',
  foreignKey: 'userId',
  otherKey: 'notificationId',
});

Notification.belongsToMany(User, {
  through: NotificationToUser,
  as: 'notifications',
  foreignKey: 'notificationId',
  otherKey: 'userId',
});

User.belongsToMany(Room, {
  through: RoomToUser,
  as: 'users',
  foreignKey: 'userId',
  otherKey: 'roomId',
});

Room.belongsToMany(User, {
  through: RoomToUser,
  as: 'rooms',
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
