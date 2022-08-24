import { ImageType } from "../types";

export const getItems = () => {
  let filesData: ImageType[] = [];
  if (localStorage.getItem("filesData")) {
    console.log(localStorage.getItem("filesData")!)
    filesData = JSON.parse(localStorage.getItem("filesData")!);
  }
  return filesData
};

export const syncLocalStorage = (ImageList :ImageType[]) => {
    localStorage.setItem("filesData", JSON.stringify(ImageList))
}
