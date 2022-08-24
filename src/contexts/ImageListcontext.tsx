import { createContext, FC, useEffect, useState } from "react";
import { ImageType } from "../types";
import { getItems, syncLocalStorage } from "../utils/localstorage";

interface InitialData {
  filesData: ImageType[];
  syncLocalStorage: VoidFunction;
  updateImageStatus: (imageData: ImageType) => void;
  pushImageData: (imageData: ImageType) => void;
}

interface Props {
  children: React.ReactNode;
}

const ImageListContext = createContext<InitialData>({
  filesData: [],
  syncLocalStorage: () => {},
  updateImageStatus: () => {},
  pushImageData: () => {},
});

const ImageListProvider: FC<Props> = ({ children }) => {
  const [filesData, setFilesData] = useState(getItems());

  useEffect(() => {
    console.log(getItems());
    syncLocalStorage(filesData);
  }, [filesData]);

  const updateImageStatus = (imageData: ImageType) => {
    const fileIndex = filesData.findIndex((value) => value.id === imageData.id);
    setFilesData((files) =>
      files.map((file, i) => {
        if (i === fileIndex) {
          file = imageData;
        }
        return file;
      })
    );

  };

  const syncLocalStorageData = () => {
    syncLocalStorage(filesData);
  };

  const pushImageData = (imageData: ImageType) => {
    setFilesData((files) => [...files, imageData]);
  };

  return (
    <ImageListContext.Provider
      value={{
        filesData,
        syncLocalStorage: syncLocalStorageData,
        updateImageStatus: updateImageStatus,
        pushImageData,
      }}
    >
      {children}
    </ImageListContext.Provider>
  );
};

export { ImageListProvider, ImageListContext };

