import React from 'react';
import { GiWheat } from 'react-icons/gi'; // Example icon from react-icons

const CropDetailCard = ({ crop }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden bg-white">
      <div className="px-6 py-4">
        <div className="  mb-4">
         
          <div>
          <GiWheat className="text-4xl text-green-700 mr-4" />
            <h2 className="font-bold text-xl mb-2">{crop.name}</h2>
          
          </div>
          <p className="text-gray-700 text-base">{crop.description}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-600"><span className="font-semibold">Season:</span> {crop.season}</p>
          <p className="text-gray-600"><span className="font-semibold">Harvest Time:</span> {crop.harvestTime}</p>
          <p className="text-gray-600"><span className="font-semibold">Yield:</span> {crop.yield}</p>
        </div>
      </div>
    </div>
  );
};

export default CropDetailCard;