"use client";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "@/utils/firebase/client";
import DataTable from "@/components/Reservations/datatable";
import ReservationModal from "@/components/Reservations/ViewDetailsModal";
import { useState } from "react";

const Ofertantes = () => {
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false);
  const reservationsQuery = query(collection(db, 'reservations'));
  const [reservations, reservationsLoading, error] = useCollection(reservationsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (reservationsLoading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between p-4">
        <h2 className="font-semibold text-xl">Reservas</h2>
      </div>
      <DataTable reservations={reservations} onRowClick={openModal}/>
      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Ofertantes;