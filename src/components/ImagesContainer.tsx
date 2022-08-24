import { Wrap, WrapItem } from "@chakra-ui/react";
import { useContext } from "react";
import { ImageListContext } from "../contexts/ImageListcontext";
import ImageCard from "./ImageCard";

type Props = {};

const ImagesContainer = (props: Props) => {
  const { filesData } = useContext(ImageListContext);
  // @ts-ignore
  return (
    <>
      <Wrap>
        {filesData.map((image) => {
          return (
            <WrapItem key={image.id}>
              <ImageCard imageData={image} />
            </WrapItem>
          );
        })}
      </Wrap>
      ;
    </>
  );
};

export default ImagesContainer;
