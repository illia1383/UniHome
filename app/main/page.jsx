"use client";
import { useEffect, useState } from 'react';
import { Flex, Box, Heading, Spinner, Tabs, TabList, TabPanels, Tab, TabPanel, useMediaQuery } from '@chakra-ui/react';
import { fetchApi } from '@/utils/fetchApi';
import MapComponent from '@/components/Map';
import Property from '@/components/Property';
import Navbar from '@/components/Navbar';

const Main = () => {
    const [originalProperties, setOriginalProperties] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', bedrooms: '' });
    const [activeTab, setActiveTab] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const fetchData = async () => {
        try {
            const url = '/api/listings';
            const data = await fetchApi(url);
            console.log('Fetched data:', data);
            setOriginalProperties(data || []);
            setProperties(data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        return originalProperties.filter(property => {
            const { minPrice, maxPrice, bedrooms } = filters;
            const price = property.price;
            const propertyBedrooms = property.bedrooms;

            return (
                (!minPrice || price >= minPrice) &&
                (!maxPrice || price <= maxPrice) &&
                (!bedrooms || propertyBedrooms >= bedrooms)
            );
        });
    };

    useEffect(() => {
        fetchData();
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setProperties(applyFilters());
    }, [filters, originalProperties]);

    if (loading) return <Spinner />;
    if (error) return <Box>Error: {error}</Box>;

    return (
        <Flex direction="column" align="start" justify="center" width="100%">
            <Navbar setFilters={setFilters} />
            {isMobile ? (
                <Tabs index={activeTab} onChange={(index) => setActiveTab(index)} width="100%">
                    <TabList>
                        <Tab>Properties</Tab>
                        <Tab>Map</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box overflowY="scroll" height="80vh" p={4}>
                                <Heading mb={4}>Properties</Heading>
                                {properties.map((property, index) => (
                                    <Property key={index} property={property} />
                                ))}
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box height="80vh">
                                <MapComponent properties={properties} isMounted={isMounted} />
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            ) : (
                <Flex width="100%">
                    <Box width="40%" overflowY="scroll" height="80vh" p={4}>
                        <Heading mb={4}>Properties</Heading>
                        {properties.map((property, index) => (
                            <Property key={index} property={property} />
                        ))}
                    </Box>
                    <Box width="60%" height="80vh">
                        <MapComponent properties={properties} isMounted={isMounted} />
                    </Box>
                </Flex>
            )}
        </Flex>
    );
};

export default Main;
