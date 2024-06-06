// MapComponent.jsx
import { useEffect } from 'react';

const MapComponent = ({ properties }) => {
    useEffect(() => {
        // Load Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXmfhKytLuy7FYxUA34SY5seZmkOM1Pqw`;
        script.async = true;
        document.body.appendChild(script);

        // Create the map and add markers once the API is loaded
        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 43.009953, lng: -81.273613 }, // Default center for London ON
                zoom: 13, // Default zoom level
                mapTypeControl: false,
                streetViewControl: false,
                
                
            });
            const westernCampus = new google.maps.Circle({
                center:{lat: 43.009953, lng: -81.273613},
                radius: 1200,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });
            westernCampus.setMap(map);

            properties.forEach((property) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: property.latitude, lng: property.longitude },
                    
                    map,
                    title: property.address,


                });

                const infoWindowContent = `
                    <div style="width: 200px;">
                        <h3 style="color: black;" >${property.address}</h3>
                        <img src="${property.imgSrc}" alt="${property.address}" style="width: 100%; height: auto;"/>
                        <p style="color: black;">Price: $${property.price}</p>
                        <p style="color: black;">Bedrooms: ${property.bedrooms}</p>
                        <p style="color: black;">Bathrooms: ${property.bathrooms}</p>
                    </div>
                `;

                const infoWindow = new window.google.maps.InfoWindow({
                    content: infoWindowContent,
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        };

        return () => {
            // Clean up script
            document.body.removeChild(script);
        };
    }, [properties]);

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapComponent;
