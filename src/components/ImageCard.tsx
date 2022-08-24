import {
    Box,
    Image,
    Progress,
    ProgressLabel,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { AxiosRequestConfig } from "axios";
import { useContext, useEffect, useState } from "react";
import { FileUpload } from "../api/api";
import { ImageListContext } from "../contexts/ImageListcontext";
import { ImageType } from "../types";
import { greyShade } from "../utils/colors";
import ImageModal from "./ImageModal";

type Props = {
  imageData: ImageType;
};

const ImageCard = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { imageData } = props;
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(true);
  const imageListContext = useContext(ImageListContext)

  
  useEffect(() => {
    if (!imageData.isUploaded && mounted) {
      uploadImage();
      setMounted(false);
    }
  }, [imageData, mounted]);

  const fileOptions: AxiosRequestConfig = {
    withCredentials: false,
    headers: { "content-type": "multipart/form-data" },
    
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
    },
  };

  const uploadImage = async () => {
    
    const data = new FormData();
    data.append("file", imageData.file);
    data.append("upload_preset", "testtest");
    data.append("cloud_name", "dplwazmlj");

    const response = await FileUpload(imageData.file, fileOptions);
    if(response.status === 200) {
        imageListContext.updateImageStatus({...imageData, isUploaded: true, URL: response.data.url})
    }

  };

  return (
    <VStack
      maxH="56"
      w={60}
      borderRadius="md"
      color="#B0B6BB"
      bgColor={greyShade}
      onClick={onOpen}
      cursor="pointer"
      m={2}
    >
      <Box height="40" width="60">
        {!imageData.isUploaded ? (
          <Box alignItems="center" justifyContent="center" w="full" h="full">
            <Progress mt="20" mx="5" borderRadius="2xl" size="lg" value={progress}>
              <ProgressLabel>
                <Text fontSize={12}>{progress}%</Text>
              </ProgressLabel>
            </Progress>
          </Box>
        ) : (
          <Image
            borderRadius="md"
            boxSize="full"
            objectFit="cover"
            src={imageData.URL}
            alt="Dan Abramov"
          />
        )}
      </Box>
      <Text alignSelf="start" px="2" py="2">
        {props.imageData.title}
      </Text>
      <ImageModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ImageCard;
