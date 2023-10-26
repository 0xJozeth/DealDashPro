"use client";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Hero } from "@/components/Hero/Hero";
import Navigator from "@/components/Navigator";
import NavigatorAlt from "./Navigator";

export default function Map() {
  return (
    <GoogleMap
      zoom={4}
      center={{ lat: 34, lng: -67 }}
      mapContainerClassName="relative w-full h-[calc(100vh-80px)]"
    >
      <Navigator />
    </GoogleMap>
  );
}
