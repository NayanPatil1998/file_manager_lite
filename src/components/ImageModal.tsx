import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { ImageListContext } from "../contexts/ImageListcontext";
import { greyShade } from "../utils/colors";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  id: string;
};

const ImageModal: FC<Props> = ({ isOpen, onClose, id }) => {
  const [index, setIndex] = useState(0);

  const { filesData } = useContext(ImageListContext);

  useEffect(() => {
    const fileIndex = filesData.findIndex((value) => value.id === id);
    setIndex(fileIndex);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#181818">
          <ModalCloseButton color="white" />
          <ModalBody>
            <Box
              display="flex"
              flex="1"
              justifyContent="center"
              alignItems="center"
            >
              <Box height="sm" width="sm" my="10" mx="5">
                <Image
                  borderRadius="md"
                  boxSize="full"
                  objectFit="contain"
                  src={filesData[index].URL}
                  alt="Dan Abramov"
                />
              </Box>
            </Box>
          </ModalBody>
          <HStack mx="2" color="white" justifyContent="space-between">
            <Text alignSelf="start" px="2" py="2">
              {filesData[index].title}
            </Text>
            <HStack>
              <Button
                bgColor={greyShade}
                w="4"
                h="6"
                onClick={() => {
                  if(index > 0)
                  setIndex((i) => i - 1);
                }}
              >
                <ChevronLeftIcon />
              </Button>
              <Text alignSelf="start" color={greyShade} px="2" py="2">
                {index + 1}/{filesData.length} FILES
              </Text>
              <Button bgColor={greyShade} w="4" h="6" onClick={() => {
                  if(index < filesData.length - 1)
                  setIndex((i) => i + 1);
                }}>
                <ChevronRightIcon />
              </Button>
            </HStack>
          </HStack>
          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
