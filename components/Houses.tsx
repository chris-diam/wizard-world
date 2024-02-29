"use client";
import { useEffect, useState } from "react";
import { validColors } from "@/colors/validColors";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

type House = {
  name: string;
  animal: string;
  id: string;
  houseColours: string;
  founder: string;
};

const Houses = () => {
  const [houses, setHouses] = useState<House[]>([]);
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
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" size="10rem" />
      </Stack>
    );
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
            className="rounded-lg md:w-[420px] border-2 border-[#e3e3e3] mb-8 h-full shadow-md"
          >
            <div className="flex justify-between px-4 pt-3 pb-3">
              <h2 className="text-[22px] font-black">{house.name}</h2>
              <p className="text-[14px]  pt-1 px-2"> {house.animal}</p>
            </div>

            {validColors.includes(
              house.houseColours.split(" ")[0].toLowerCase()
            ) &&
            validColors.includes(
              house.houseColours.split(" ")[2].toLowerCase()
            ) ? (
              <div
                className="mx-3 mb-4 rounded"
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
                className="mx-3 mb-4 rounded"
                style={{
                  backgroundImage: `linear-gradient(to right, white, black`,
                  width: "92%",
                  height: "20px",
                }}
              ></div>
            )}

            <div className="flex px-4 pt-1 pb-4">
              <p>Founder: </p>
              <p className="font-bold ml-2"> {house.founder}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Houses;
