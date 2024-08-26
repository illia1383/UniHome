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
                            <div style="width: 300px; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 8px; padding: 10px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                            <h3 style="color: #333; font-weight: bold; margin-bottom: 8px; font-size: 18px;">${property.address}</h3>
                            <img src="${property.image}" alt="${property.address}" style="width: 100%; height: auto; border: 2px solid #ddd; border-radius: 4px; margin-bottom: 10px;"/>
                            <p style="color: #666; margin: 0 0 5px; font-size: 16px;"><strong>Price:</strong> $${property.price}</p>
                            <p style="color: #666; margin: 0; font-size: 16px;"><strong>Bedrooms:</strong> ${property.bedrooms}</p>
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
