import React from 'react';

export const ParkingCard = ({ name, providerName, status, vehicleCount, onClick }) => {
  const role = sessionStorage.getItem('role')
  const statusColors = {
    Activo: { dotColor: 'bg-green-500', textColor: 'text-green-800' },
    Cerrado: { dotColor: 'bg-red-500', textColor: 'text-red-800' },
    Mantenimiento: { dotColor: 'bg-yellow-500', textColor: 'text-yellow-800' },
    Completo: { dotColor: 'bg-gray-500', textColor: 'text-gray-800' }
  };

  const { dotColor, textColor } = statusColors[status] || statusColors['Cerrado'];

  return (
    <div className={`bg-white shadow-lg rounded-lg p-5 cursor-pointer`} onClick={onClick}>
      <div className={`h-3 w-3 ${dotColor} rounded-full`}></div>
      <h3 className="text-lg font-semibold">{name}</h3>
      {role != 'provider' && (
        <p>Ofernante: {providerName}</p>
      )}
      <p className="text-sm">Estado: {status}</p>
      <p className="text-sm">Espacio de Vehiculos: {vehicleCount}</p>
    </div>
  );
};
