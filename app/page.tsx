import Image from "next/image";
import Houses from "@/components/Houses";
import localfont from "next/font/local";

export default function Home() {
  return (
    <div className="flex justify-center mt-12">
      <Houses />
    </div>
  );
}
