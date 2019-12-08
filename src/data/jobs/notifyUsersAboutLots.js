import debugHandler from 'debug';

import {
  Room,
  Lot,
  Notification,
  NotificationToUser,
  RoomToUser,
} from 'data/models';
import Promise from 'bluebird';
import { Op } from 'sequelize';
import moment from 'moment';
import _ from 'lodash';

const debug = debugHandler('goodsville:jobs:notify-users-about-lots');

const timeArr = Object.freeze([
  { time: 600, label: '10 minutes' },
  { time: 300, label: '5 minutes' },
  { time: 60, label: '1 minute' },
  { time: 10, label: '10 seconds' },
]);

const DIFF_SEC = 60;

const notificationTemplate = _.template(
  `Auction in room #<%= roomId %> with lot "<%= lotName %>" starts in <%= timeLabel %>`,
);

export default async () => {
  const rooms = await Room.findAll({
    attributes: ['id', 'startedAt'],
    where: {
      status: 'open',
      startedAt: {
        [Op.lte]: moment().add('11', 'm'),
        [Op.gte]: new Date(),
      },
    },
    include: [
      {
        model: Lot,
        as: 'lot',
        attributes: ['id', 'name'],
      },
    ],
  });
  debug('Found %d rooms for notify', rooms.length);
  const pretendingRoomsByTime = timeArr.map(timeObj => {
    const roomsInTime = rooms.filter(r => {
      const timePlusNow = moment().add(timeObj.time, 's');
      return moment(r.startedAt).isBetween(
        timePlusNow.clone().subtract(DIFF_SEC, 's'),
        timePlusNow.clone().add(DIFF_SEC, 's'),
      );
    });
    _.remove(rooms, r => roomsInTime.includes(r));

    return {
      timeObj,
      rooms: roomsInTime.map(r => ({
        ...r.toJSON(),
        notificationText: notificationTemplate({
          roomId: r.id,
          lotName: r.lot.name,
          timeLabel: timeObj.label,
        }),
      })),
    };
  });
  await Promise.each(pretendingRoomsByTime, async pair => {
    if (!pair.rooms.length) return;

    // todo: optimize
    const notifications = await Notification.findAll({
      where: {
        roomId: pair.rooms.map(x => x.id),
        time: pair.timeObj.time,
      },
    });

    const roomsToNotify = pair.rooms.filter(
      r => !notifications.map(n => n.roomId).includes(r.id),
    );
    if (!roomsToNotify.length) return;
    const createdNotifications = await Notification.bulkCreate(
      roomsToNotify.map(r => ({
        level: 'info',
        roomId: r.id,
        time: pair.timeObj.time,
        message: r.notificationText,
      })),
      { returning: true },
    );
    debug('Created %d notifications', createdNotifications.length);
    await Promise.each(createdNotifications, async n => {
      // todo: optimize
      const rtus = await RoomToUser.findAll({
        where: { roomId: n.roomId, involved: true },
      });

      await NotificationToUser.bulkCreate(
        rtus.map(rtu => ({
          notificationId: n.id,
          userId: rtu.userId,
        })),
        { returning: true },
      );
    });
  });
};
