import { Box, Heading, Image, Text } from '@chakra-ui/react';

const Property = ({ property }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" mb={4} width="80%" padding={8}>
            <Heading fontSize="xl">{property.address}</Heading>
            <Image src={property.imgSrc} alt={property.address} boxSize="300px" objectFit="cover" />
            <Text>Price/Month: ${property.price}</Text>
            <Text>Bedrooms: {property.bedrooms}</Text>
            <Text>Bathrooms: {property.bathrooms}</Text>
            
        </Box>
    );
};

export default Property;
