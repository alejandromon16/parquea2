import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Image,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import MapboxMap from "./Map/MapBoxMap";

const ParkingDetailsModal = ({ isOpen, onClose, parking }) => {
  if (!parking) return null;

  const renderStars = (count) => {
    return Array(5)
      .fill("")
      .map((_, i) => (
        <StarIcon key={i} color={i < count ? "yellow.400" : "gray.300"} />
      ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{parking.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginBottom={5}>Ofertante: {parking.userName}</Text>
          <Flex direction="column" rowGap={14}>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Ranking
              </Text>
              <Flex>
                {renderStars(parking.ranking)}
                <Badge
                  ml="2"
                  colorScheme="green"
                >{`${parking.rating}/5 (${parking.reservationsCompleted} reviews)`}</Badge>
              </Flex>
            </Box>
            {/* <Box flexDirection={"column"} rowGap={5}>
              <Text fontSize="lg" fontWeight="bold">
                Ubicacion
              </Text>
              <MapboxMap
                coordinates={{
                  lat: parking.coordinates.latitude,
                  lng: parking.coordinates.longitude,
                }}
              />
            </Box> */}
            <Box flexDirection={"column"} rowGap={5}>
              <Text fontSize="lg" fontWeight="bold">
                Imagenes
              </Text>
              <Image key="1" src={parking.imgUrl} boxSize="400px" mr="2" />
              {/* <Flex overflowX="scroll">
                {parking.images.map((image, index) => (
                  <Image key={index} src={image} boxSize="400px" mr="2" />
                ))}
              </Flex> */}
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Espacio
              </Text>
              <Text>Cantidad de Espacio: {parking.numberOfSpaces}</Text>
              {/* {parking.spaces.map((space, index) => (
                <Text key={index}>{`Espacio ${index + 1}: ${space.width}m W x ${
                  space.length
                }m L x ${space.height}m H`}</Text>
              ))} */}
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Detalles del Garaje
              </Text>
              {parking.details.map((detail, index) => (
                <Text key={index} mt="2" fontStyle="italic">
                  "{detail}"
                </Text>
              ))}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="yellow" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ParkingDetailsModal;
