"use client";
import { useEffect, useState } from "react";
import House from "@/components/House";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { HouseProps } from "@/components/types";
const SERVER_URL = process.env.SERVER_URL;

export default function Home() {
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!SERVER_URL) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setHouses(data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-24">
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="inherit" size="10rem" />
        </Stack>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-12">
      {houses.map((house) => (
        <div key={house.id}>
          <House
            id={house.id}
            name={house.name}
            houseColours={house.houseColours}
            animal={house.animal}
            founder={house.founder}
          />
        </div>
      ))}
    </div>
  );
}
