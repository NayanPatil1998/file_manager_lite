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
import { FC } from "react";
import { greyShade } from "../utils/colors";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const ImageModal: FC<Props> = ({ isOpen, onClose }) => {
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
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
              </Box>
            </Box>
          </ModalBody>
          <HStack mx="2" color="white" justifyContent="space-between">
            <Text alignSelf="start" px="2" py="2">
              Drag and Drop files to upload
            </Text>
            <HStack>
              <Button bgColor={greyShade} w="4" h="6" >
                <ChevronLeftIcon />
              </Button>
              <Text alignSelf="start" color={greyShade} px="2" py="2">
                1/2 FILES
              </Text>
              <Button bgColor={greyShade} w="4" h="6">
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
