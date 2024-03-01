"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { validColors } from "@/colors/validColors";
import { HouseProps } from "./types";

const House: FunctionComponent<HouseProps> = (props) => {
  return (
    <div>
      <div
        key={props.id}
        className="rounded-lg md:w-[420px] border-2 border-[#e3e3e3] mb-8 h-full  shadow-md"
      >
        <div className="flex justify-between px-4 pt-3 pb-3">
          <h2 className="text-[22px] font-black">{props.name}</h2>
          <p className="text-[14px]  pt-1 px-2"> {props.animal}</p>
        </div>

        {validColors.includes(props.houseColours.split(" ")[0].toLowerCase()) &&
        validColors.includes(props.houseColours.split(" ")[2].toLowerCase()) ? (
          <div
            className="mx-3 mb-4 rounded "
            style={{
              backgroundImage: `linear-gradient(to right, ${props.houseColours
                .split(" ")[0]
                .toLowerCase()}, ${props.houseColours
                .split(" ")[2]
                .toLowerCase()})`,
              width: "92%",
              height: "20px",
            }}
          ></div>
        ) : (
          <div
            className="mx-3 mb-4 rounded "
            style={{
              backgroundImage: `linear-gradient(to right, white, black`,
              width: "92%",
              height: "20px",
            }}
          ></div>
        )}

        <div className="flex px-4  pt-1 pb-4">
          <p>Founder: </p>
          <p className="font-bold ml-2"> {props.founder}</p>
        </div>
      </div>
    </div>
  );
};

export default House;
