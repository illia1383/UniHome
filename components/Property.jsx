
import { Box, Heading, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Image, Flex, Button,Spacer,Grid,GidItem} from '@chakra-ui/react';
import { useState } from 'react';
import { fetchApi } from '@/utils/fetchApi';

const Property = ({ property }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);


  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchApi(`/api/listingDetails?id=${property.listingId}`);
      setDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    onOpen();
    fetchDetails();
  };
    const prevImage = () => {
        setSelectedImage((selectedImage - 1 + details.images.length) % details.images.length);
    };

    const nextImage = () => {
        setSelectedImage((selectedImage + 1) % details.images.length);
    };

  return (
    <>
    <Flex direction="row" align="start" justify="center" width="100%">
      <Box p={5} shadow="md" borderWidth="1px" mb={4} width="80%" padding={8} onClick={handleClick} cursor="pointer">
        <Heading fontSize="xl">{property.address}</Heading>
        <Image padding = {2} src={property.image} alt="property" />
        <Text>Price/Month: ${property.price}</Text>
        <Text> Bedrooms: {property.bedrooms} </Text>
        <Text>Available: {property.available}</Text>
      </Box>
      </Flex>
      
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{property.address}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        // need to fix the parking
        details && (
          <Flex flexWrap = "wrap"  align="start" justify="center" width="100%">
          <Box gap = "200" p={5} shadow="md" borderWidth="1px"  width="100%" padding = "8"  >
            <Flex flexWrap="wrap" align="center" >
              {details.images && details.images.length > 0 ? (
              <Image src={details.images[selectedImage]} alt={`Image ${selectedImage + 1}`} boxSize="100%" align="center" />
            ) : (
              <Text>No images available</Text>
            )}
            <Button  onClick={prevImage}>Prev</Button>
            <Button onClick={nextImage}>Next</Button>
            </Flex>



        </Box>
        <Box width="100%">
          <Flex flexWrap="wrap" justify="start" p = "2">
            <Box padding= "2">
              <Heading size = "sm">Facts and Features</Heading>
              <Text>Housing Type: {details.housingType}</Text>
              <Text>Bedrooms: {property.bedrooms}</Text>
              <Text>Utilities: {details.utilities}</Text>
              <Text>Date Available: {details.availableDate}</Text>
              <Text>Lease Term: {details.leaseTerm}</Text>
              <Text>Distance to campus: {details.distance}</Text>
            </Box>
            <Box padding ="2">
              <Heading size = "sm">Amenities</Heading>
              <Flex flexWrap="wrap">
              {details.amenities.map((amenity, index) => (
              <Text key={index} width="50%">
              {amenity}
              </Text>
              ))}
              </Flex>
              </Box>
            <Box padding= "2">
              <Heading size = "sm">Description</Heading>
              <Text>{details.description}</Text>
            </Box>
            <Box padding= "2">
              <Heading size = "sm">Contact</Heading>
              <Text>{details.contact.name}</Text>
              <Text>{details.contact.phone}</Text>

            </Box>
              </Flex>
        </Box>
      </Flex>
        )
      )}
    </ModalBody>
  </ModalContent>
</Modal>
    </>
  );
};

export default Property;
