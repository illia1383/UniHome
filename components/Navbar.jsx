import { useState } from 'react';
import Link from "next/link"; 
import { Flex, Box, Spacer, Input, Button } from '@chakra-ui/react';
import { BsSearch } from "react-icons/bs";

const Navbar = ({ setFilters, fetchData }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');

    const handleSearch = () => {
        const filters = { minPrice, maxPrice, bedrooms };
        setFilters(filters);
    };

    return (
        <Flex p="4" borderBottom="1px" borderColor="gray.200" padding={8} >
            <Box>
                <Box gap={2} fontSize="3xl" color="blue.400" fontWeight="bold"> 
                    <Link href="/" >UniHome</Link>
                </Box>
                
                <Box display="flex" gap={2}> {/* Add display flex and gap to arrange inputs horizontally */}
                    <Input 
                        placeholder="Min Price" 
                        size="md" 
                        value={minPrice} 
                        onChange={(e) => setMinPrice(e.target.value)} 
                    />
                    <Input 
                        placeholder="Max Price" 
                        size="md" 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(e.target.value)} 
                    />
                    <Input 
                        placeholder="Min Bedrooms" 
                        size="md" 
                        value={bedrooms} 
                        onChange={(e) => setBedrooms(e.target.value)} 
                    />
                    <Button colorScheme="blue" width="80%" leftIcon={<BsSearch />} onClick={handleSearch}>
                        Search
                    </Button>
                </Box>
            </Box>

        </Flex>
    );
};

export default Navbar;
