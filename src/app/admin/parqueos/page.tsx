'use client'
import { Button, Input} from "@chakra-ui/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import CreateParkingForm from "@/components/NewParkingForm";
import ParkingDetailsModal from "@/components/ParkingDetailsModal";
import { auth, db } from "@/utils/firebase/client";
import { collection, DocumentData, Query, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { ParkingCard } from "@/components/ParkingCard";
import { useAuth } from "@/hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const ParkingList = ({ parqueos, onCardClick, searchQuery }) => {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: (custom) => ({
      opacity: 1,
      transition: { duration: 0.6, delay: custom * 0.2 },
    }),
  };

  const filteredParqueos = parqueos.filter((doc) => {
    const { name, userName, numberOfSpaces } = doc.data();
    const searchText = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(searchText) ||
      userName.toLowerCase().includes(searchText) ||
      numberOfSpaces.toString().includes(searchText) || 
      'activo'.includes(searchText) 
    );
  });

  return (
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredParqueos.map((doc, index) => {
          const garage = doc.data();
          return (
            <motion.div
              key={garage.id}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <ParkingCard
                name={garage.name}
                providerName={garage.userName || 'Alejandro Montero'}
                status={'Activo'}
                vehicleCount={garage.numberOfSpaces}
                onClick={() => onCardClick(garage)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Parking = () => {
  const [selectedParking, setSelectedParking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showList, setShowList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useAuthState(auth)
  const { role } = useAuth() || {};



  let garagesQuery: Query<DocumentData, DocumentData>;
  if (role === "provider" && user) {
    garagesQuery = query(
      collection(db, "garages"),
      where("userId", "==", user.uid)
    );
  } else {
    garagesQuery = query(collection(db, "garages"));
  }

  const [garages, garagesLoading, error] = useCollection(garagesQuery);

  const handleParkingClick = (parking) => {
    setSelectedParking(parking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParking(null);
  }

  const handleAddNewParking = () => {
    setShowList(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-5">
        <h1 className="text-xl font-bold">Garaje</h1>
        {role === 'provider' && (
          <Button onClick={handleAddNewParking} colorScheme="yellow">
            Agregar Nuevo Garaje
          </Button>
        )}
      </div>
      <Input
        placeholder="Search by name, provider, status, or spaces..."
        value={searchQuery}
        onChange={handleSearchChange}
        size="lg"
        marginBottom="4"
        px={5}
        marginX={5}
      />
      <AnimatePresence>
        {showList ? (
          <motion.div key="parkingList">
            {garages && (
              <ParkingList
                parqueos={garages.docs}
                onCardClick={handleParkingClick}
                searchQuery={searchQuery}
              />
            )}
          </motion.div>
        ) : (
          <CreateParkingForm onSubmit={() => {}} />
        )}
      </AnimatePresence>
      {selectedParking && (
        <ParkingDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          parking={selectedParking}
        />
      )}
    </div>
  );
};

export default Parking;
