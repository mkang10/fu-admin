export const formatDateDetail = (inputDate: string): string => {
  const date = new Date(inputDate);
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month: string = monthNames[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();
  const amOrPm: string = hours >= 12 ? "pm" : "am";
  const formattedHours: number = hours % 12 || 12;
  const formattedDay: string = day < 10 ? `0${day}` : day.toString();
  const formattedMinutes: string =
    minutes < 10 ? `0${minutes}` : minutes.toString();
  const formattedSeconds: string =
    seconds < 10 ? `0${seconds}` : seconds.toString();

  const formattedDate: string = `${month} ${formattedDay}th ${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;

  return formattedDate;
};

export const formatDateToMMDDYYYY = (inputDate: string) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}-${year}`;
};
