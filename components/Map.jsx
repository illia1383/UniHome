import { useEffect, useState } from 'react';

const MapComponent = ({ properties, isMounted }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        if (!isScriptLoaded) {
            const script = document.createElement('script');
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                console.log('Google Maps API script loaded.');
                setIsScriptLoaded(true);
            };

            script.onerror = () => {
                console.error('Error loading Google Maps API script.');
            };

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isScriptLoaded]);

    useEffect(() => {
        if (isMounted && isScriptLoaded) {
            console.log('Initializing map...');
            const mapElement = document.getElementById('map');
            if (mapElement) {
                console.log('Map element found:', mapElement);
                const map = new window.google.maps.Map(mapElement, {
                    center: { lat: 43.009953, lng: -81.273613 },
                    zoom: 13,
                    mapTypeControl: false,
                    streetViewControl: false,
                });

                console.log('Map initialized:', map);

                const westernCampus = new window.google.maps.Circle({
                    center: { lat: 43.009953, lng: -81.273613 },
                    radius: 1200,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                });
                westernCampus.setMap(map);

                properties.forEach((property) => {
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ address: property.address }, (results, status) => {
                        if (status === 'OK') {
                            const marker = new window.google.maps.Marker({
                                position: results[0].geometry.location,
                                map,
                                title: property.address,
                            });

                            const infoWindowContent = `
                                <div style="width: 300px;">
                                    <h3 style="color: black; font-weight: bold;">${property.address}</h3>
                                    <img src="${property.image}" alt="${property.address}" style="width: 100%; height: auto;"/>
                                    <p style="color: black;">Price: $${property.price}</p>
                                    <p style="color: black;">Bedrooms: ${property.bedrooms}</p>
                                </div>
                            `;

                            const infoWindow = new window.google.maps.InfoWindow({
                                content: infoWindowContent,
                            });

                            marker.addListener('click', () => {
                                infoWindow.open(map, marker);
                            });
                        } else {
                            console.error('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                });
            } else {
                console.error('Map element not found.');
            }
        }
    }, [isMounted, isScriptLoaded, properties]);

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapComponent;
