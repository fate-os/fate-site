// import "moment-timezone";
import moment from "moment";

// import { Request } from "express";
// // 2023-08-12T19:08:06+00:00
// export function getTimeZoneOffset() {
//   var offset = new Date().getTimezoneOffset(),
//     o = Math.abs(offset);
//   return (
//     (offset < 0 ? "+" : "-") +
//     ("00" + Math.floor(o / 60)).slice(-2) +
//     ":" +
//     ("00" + (o % 60)).slice(-2)
//   );
// }

// export const localTimeOrigin = (date: string | Date, req: Request) => {
//   var zone = new GetLocation({ req }).getTimeZone;

//   return moment(date).tz(zone);
// };
export const getLocalTime = (date: string | Date) => {
  var stillUtc = moment.utc(new Date(date)).toDate();
  // console.log(stillUtc, "stillUtc");
  return moment(stillUtc).local();
};

// export const getLocalTimeZoneOrigin = () => {
//   const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   return moment.tz.guess() || zone;
// };

// export const getUtcTime = (date: string | Date, utc: string) => {
//   // console.log(stillUtc, "stillUtc");
//   return moment(date).utcOffset(utc);
// };

export function getUTCTime(dateTimeString: string): Date {
  const dateTime = new Date(dateTimeString);
  const dateTimeNumber = dateTime.getTime();
  const dateTimeOffset = dateTime.getTimezoneOffset() * 60000;
  const dateTimeUTC = new Date();
  dateTimeUTC.setTime(dateTimeNumber - dateTimeOffset);

  return dateTimeUTC;
}
