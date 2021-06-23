import { PrivateMessage } from "../Model/MessageModel";

export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


export function parseJson(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}


function addZero(data: number) {
  if (data.toString().length === 1) {
    return `0${data}`;
  }
  return data;
}

function monthHandle(month: number) {
  return `${month + 1 < 10 ? `0${month + 1}` : month + 1}`;
}

export const toNormalTime = (dateTime: string) => {
  const dateOfArg = new Date(dateTime);
  const [yearOfArg, monthOfArg, dayOfArg, hourOfArg, minuteOfArg] = [
    dateOfArg.getFullYear(),
    dateOfArg.getMonth(),
    dateOfArg.getDate(),
    dateOfArg.getHours(),
    dateOfArg.getMinutes(),
  ];
  const date = new Date();
  const [today, yesterday, thisMonth, thisYear] = [
    date.getDate(),
    new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];

  const isToday = thisYear === yearOfArg && thisMonth === monthOfArg && today === dayOfArg;
  if (isToday) {
    return `${addZero(hourOfArg)}:${addZero(minuteOfArg)}`;
  }

  const isYesterday = thisYear === yearOfArg && thisMonth === monthOfArg && yesterday === dayOfArg;
  if (isYesterday) {
    return `Yesterday ${addZero(hourOfArg)}:${addZero(minuteOfArg)}`;
  }

  if (yearOfArg === thisYear) {
    return `${monthHandle(monthOfArg)}/${addZero(dayOfArg)}`;
  }

  return `${yearOfArg}/${monthHandle(monthOfArg)}/${addZero(dayOfArg)}`;
};


export const getFriendUsernameFromMessage = (message: PrivateMessage) => {
  return message.type === 'FROM' ? message.toUsername : message.fromUsername;
}

export const getLoginUsernameFromMessage = (message: PrivateMessage) => {
  return message.type === 'FROM' ? message.fromUsername : message.toUsername;
}

export const messageReverseSortComparator = (m1: PrivateMessage, m2: PrivateMessage) => {
  if (!m1) {
    return 1;
  }
  if (!m2) {
    return -1;
  }
  if (!m1 && !m2) {
    return 0;
  }
  if (m1.messageId && m2.messageId) {
    return -(m1.messageId - m2.messageId);
  }

  return -(new Date(m1.time).getTime() - new Date(m2.time).getTime());
}