// Main.jsx
"use client";
import { useEffect, useState } from 'react';
import { Flex, Box, Heading, Spinner } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import MapComponent from '@/components/Map';
import Property from '@/components/Property';
import Navbar from '@/components/Navbar';

const Main = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', bedrooms: '' });

    const fetchData = async (filters = {}) => {
        try {
            const url = `${baseUrl}/search`;
            const params = {
                location: 'London Ontario',
                status: 'forRent',
                monthlyPayment_min: '2000',
                monthlyPayment_max: '2500',
                beds_min: filters.bedrooms,
            };
            const data = await fetchApi(url, params);
            console.log('Fetched data:', data);
            setProperties(data.props || []);
            console.log('Properties:', properties)
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <Box>Error: {error}</Box>;

    return (
        <Flex direction="column" align="start" justify="center" width="100%">
            <Navbar setFilters={setFilters} fetchData={fetchData} /> {/* Pass setFilters and fetchData as props */}
            <Flex direction="row" align="start" justify="center" width="100%">
                <Box width="30%" overflowY="scroll" height="80vh" p={4}>
                    <Heading mb={4}>Properties</Heading>
                    {properties.map((property) => (
                        <Property key={property.zpid} property={property} />
                    ))}
                </Box>
                <Box width="70%" height="80vh">
                    <MapComponent properties={properties} />
                </Box>
            </Flex>
        </Flex>
    );
};

export default Main;