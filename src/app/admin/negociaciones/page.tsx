'use client'
import { Box, VStack, HStack, Text, Heading, Container,Collapse, Divider } from '@chakra-ui/react';
import { collection, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '@/utils/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import CollapsibleComponent from '@/components/Collapsible';


function Negociaciones() {
  const offersQuery = query(collection(db, 'offers'));
  const [offers, offersLoading, error] = useCollection(offersQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [groupedNegotiations, setGroupedNegotiations] = useState({});
  const [selectedNegotiationKey, setSelectedNegotiationKey] = useState(null);

  // Group offers by garageId and spaceId
  useEffect(() => {
    if (offers && !offersLoading) {
      const grouped = {};
      offers.docs.forEach(doc => {
        const data = doc.data();
        const key = `${data.garageSpace.garageId}_${data.garageSpace.spaceId}`;
        if (!grouped[key]) {
          grouped[key] = {
            garageName: data.garageSpace.garageName,
            offers: []
          };
        }
        grouped[key].offers.push(data);
      });
      setGroupedNegotiations(grouped);
      // Automatically select the first negotiation
      const firstKey = Object.keys(grouped)[0];
      if (firstKey) {
        setSelectedNegotiationKey(firstKey);
      }
    }
  }, [offers, offersLoading]);

  function handleNegotiationClick(key) {
    setSelectedNegotiationKey(key);
  }

  return (
    <Container maxW="container.xl" p={4}>
      <HStack spacing={10} align="start">
        <VStack spacing={4} align="stretch" w="50%">
          {Object.entries(groupedNegotiations).map(([key, negotiation]) => (
            <Box p={5} shadow="md" borderWidth="1px" cursor="pointer" onClick={() => handleNegotiationClick(key)}>
              <Heading fontSize="xl">{negotiation['garageName'] || 'Garaje Nuevo'}</Heading>
              <Text mt={2}>Ofertas: {negotiation['offers'].length || '0'}</Text>
            </Box>
          ))}
        </VStack>

        <VStack spacing={4} align="stretch" w="50%">
          {selectedNegotiationKey && groupedNegotiations[selectedNegotiationKey] ? (
            <Box p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">Detalles de Negociación</Heading>
              {groupedNegotiations[selectedNegotiationKey].offers.map((offer, index) => (
                  <>
                  <Divider my={3} />
                  <CollapsibleComponent index={index+1}>
                      <VStack key={index} p={4}>
                      <Text>Fecha: {offer.date}</Text>
                      <Text>Oferta: {offer.payOffer} Bs</Text>
                      <Text>Estado: pendiente</Text>
                      <Text>Inicio: {offer.time.startTime}</Text>
                      <Text>Fin: {offer.time.endTime}</Text>
                      <Text>Modelo: {offer.vehicle.make} {offer.vehicle.model} ({offer.vehicle.year})</Text>
                      <Text>Placa del Vehículo: {offer.vehicle.plateNumber}</Text>
                      <img src={offer.vehicle.imgUrl} alt="Vehicle" style={{ width: "100%", marginTop: "10px" }} />
                    </VStack>
                  </CollapsibleComponent>
                  </>

              ))}
            </Box>
          ) : (
            <Box p={5} shadow="md" borderWidth="1px">
              <Text>Select a negotiation to see the details.</Text>
            </Box>
          )}
        </VStack>
      </HStack>
    </Container>
  );
}

export default Negociaciones;
