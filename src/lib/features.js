import moment from "moment";

const fileFormat = (url) => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "ogg" ||
    fileExtension === "webm"
  )
    return "video";

  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";

  if (
    fileExtension === "jpg" ||
    fileExtension === "png" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif"
  )
    return "image";
  return "file";
};

const transformImage = (url = "", width = 100) => {
  // const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return url;
};

const getLast7Days = () => {
  const todaysDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = todaysDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }
  return last7Days;
};
// const getItemfromStorage = ({ key, value, get }) => {
//   if (get) return localStorage.getItem(key) ? JSON.parse(key) : null;
//   else localStorage.setItem(key,JSON.stringify(value));
// };
const getItemfromStorage = ({ key, value, get }) => {
  if (get) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export { fileFormat, transformImage, getLast7Days,getItemfromStorage };
