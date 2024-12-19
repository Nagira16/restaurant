"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "./ui/button";

const LocationCard = () => {
    const location = {
        address: "428 Carrall St",
        city: "Vancouver",
        province: "BC",
        postalCode: "V6B 2J7",
        country: "Canada",
        instructions:
            "Please come to the main entrance and head to the pick-up counter.",
        mapUrl: "https://www.google.com/maps/place/428+Carrall+St,+Vancouver,+BC+V6B+2J7,+Canada"
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-red-500/10">
                <CardTitle className="text-xl text-red-700">
                    Pick Up Location
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-red-500" />
                            Store Location
                        </h2>
                        <p className="text-gray-700">
                            {location.address}, {location.city},
                            {location.province} {location.postalCode},
                            {location.country}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Pick Up Instructions
                        </h2>
                        <p className="text-gray-700">{location.instructions}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            className="flex-1"
                            onClick={() =>
                                window.open(location.mapUrl, "_blank")
                            }
                        >
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                                navigator.clipboard
                                    .writeText(
                                        `${location.address}, ${location.city}, ${location.province} ${location.postalCode}`
                                    )
                                    .then(() => alert("copied"));
                            }}
                        >
                            Copy Address
                        </Button>
                    </div>
                </div>

                <div className="aspect-[16/9] relative rounded-lg overflow-hidden border bg-gray-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83288.16973761786!2d-123.25662670273438!3d49.281033700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548671006edf8f2b%3A0x5aeee343927d6445!2sDo%C3%B1a%20Vicky%20Mexican%20Food%20Chinatown!5e0!3m2!1sja!2sca!4v1734573403541!5m2!1sja!2sca"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                        title="Store Location Map"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default LocationCard;
