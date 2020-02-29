import html from './returnNotification';

export default (profileInfo) => ({
  firstName: profileInfo.firstName,
  lastName: profileInfo.lastName,
  gender: profileInfo.gender,
  email: profileInfo.email,
  passport: profileInfo.passport,
  lineManager: profileInfo.lineManager,
  birthDay: profileInfo.birthDay,
  language: profileInfo.language,
  currency: profileInfo.currency,
  homeTown: profileInfo.homeTown,
  role: profileInfo.role,
  department: profileInfo.department,
  biography: profileInfo.biography,
  profileImage: profileInfo.profileImage,
  createdAt: profileInfo.createdAt,
  updatedAt: profileInfo.updatedAt,
});

export const returnNotification = (allNotifications, newnotification, url) => ({
  status: 200,
  badge: allNotifications.length,
  newnotification: html(newnotification, url),
  allNotifications: allNotifications.map((notify) => html(notify, url)),
});

