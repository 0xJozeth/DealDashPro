"use client";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Navigator from "@/components/Navigator";
import NavigatorAlt from "./Navigator";

export default function Map() {
  return (
    <GoogleMap
      zoom={4}
      center={{ lat: 34, lng: -67 }}
      mapContainerClassName="relative w-full -top-20 h-[calc(100vh-80px)] z-0"
    >
      <Navigator />
    </GoogleMap>
  );
}
