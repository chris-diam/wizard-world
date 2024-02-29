"use client";
import { useEffect, useState } from "react";
import { validColors } from "@/colors/validColors";

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://wizard-world-api.cyclic.app/houses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setHouses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul className="flex flex-col pt-4">
        {houses.map((house) => (
          <div
            key={house.id}
            className="rounded-lg w-[420px] border-2 border-[#e3e3e3] mb-8 h-full shadow-md"
          >
            <div className="flex justify-between px-4 pt-3 pb-3">
              <h2 className="text-[22px] font-black">{house.name}</h2>
              <p className="text-[14px] font-semibold pt-1"> {house.animal}</p>
            </div>

            {validColors.includes(
              house.houseColours.split(" ")[0].toLowerCase()
            ) &&
            validColors.includes(
              house.houseColours.split(" ")[2].toLowerCase()
            ) ? (
              <div
                className="mx-4 mb-4 rounded"
                style={{
                  backgroundImage: `linear-gradient(to right, ${house.houseColours
                    .split(" ")[0]
                    .toLowerCase()}, ${house.houseColours
                    .split(" ")[2]
                    .toLowerCase()})`,
                  width: "92%",
                  height: "20px",
                }}
              ></div>
            ) : (
              <div
                className="mx-1 mb-4 rounded"
                style={{
                  backgroundImage: `linear-gradient(to right, white, black`,
                  width: "95%",
                  height: "20px",
                }}
              ></div>
            )}

            <div className="flex px-4 pt-2 pb-4">
              <p>Founder: </p>
              <p className="font-bold ml-2"> {house.founder}</p>
            </div>
            {/* Add more details as needed */}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Houses;
