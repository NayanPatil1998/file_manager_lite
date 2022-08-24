import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useContext, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { ImageListContext } from "../contexts/ImageListcontext";
import { buttonBgColor, greyShade } from "../utils/colors";
import ImagesContainer from "./ImagesContainer";

type Props = {};

const HomeSection = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageDataContext = useContext(ImageListContext);
  const multipleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) =>
        imageDataContext.pushImageData({
          id: uuidv4(),
          file: file,
          title: file.name,
          isUploaded: false,
        })
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    onDrop:(files) => {
        Array.from(files).forEach((file) =>
        imageDataContext.pushImageData({
          id: uuidv4(),
          file: file,
          title: file.name,
          isUploaded: false,
        })
      );
    }
  });

  return (
    <Box display="flex" flexDir="column" height="calc(100vh)">
      {/* Drop me section */}
      <Box
        display="flex"
        color="white"
        height="calc(25vh)"
        width="full"
        justifyContent="center"
        alignItems="center"
        bgColor={greyShade}
      >
        <Box w="calc(70%)" >
          <HStack justifyContent="space-between"   >
            <VStack alignItems="start"  {...getRootProps()}>
            <input {...getInputProps()} />

              <Text letterSpacing="widest" fontWeight="bold" fontSize="3xl">
               {!isDragActive ? "DROP FILE HERE" : "DROP ME HERE..........." } 
              </Text>
              <Text>Drag and Drop files to upload</Text>
            </VStack>
            <Box></Box>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={multipleFileChange}
              multiple
            />

            <Button
                m={{base: "16", lg: "1"}}
              bgColor={buttonBgColor}
              onClick={() => inputRef.current?.click()}
              fontWeight="normal"
            >
              <Text letterSpacing="widest">UPLOAD FILE</Text>
            </Button>
          </HStack>
        </Box>
      </Box>

      <Box display="flex" p="10" flex={1} bgColor="black">
        <ImagesContainer />
      </Box>
      <Box
        pos="fixed"
        bottom="0.5"
        height="10"
        bgColor={greyShade}
        width="full"
      ></Box>
    </Box>
  );
};

export default HomeSection;
