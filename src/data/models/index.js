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

User.hasOne(UserSession, {
  foreignKey: 'userId',
  as: 'session',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(Lot, {
  foreignKey: 'userId',
  as: 'lots',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Lot.hasMany(Bet, {
  foreignKey: 'id',
  as: 'betPerLot',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Room.hasOne(Lot, {
  foreignKey: 'id',
  as: 'lotInRoom',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.belongsToMany(Notification, { through: NotificationToUser });
Notification.belongsToMany(User, { through: NotificationToUser });

User.belongsToMany(Room, { through: RoomToUser });
Room.belongsToMany(User, { through: RoomToUser });

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
