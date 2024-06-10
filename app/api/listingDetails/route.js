import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('id');
  if (!listingId) {
    return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
  }

  try {
    const url = `https://offcampus.uwo.ca/Listings/Details/${listingId}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);



    const details = {};

    // Extract information
    details.housingType = $('.details-description-section .grds .grd-2:nth-child(2)').text().trim();
    details.bedrooms = $('.details-description-section .grds .grd-2:nth-child(4)').text().trim();
    details.utilities = $('.details-description-section .grds .grd-2:nth-child(6)').text().trim();
    details.availableDate = $('.details-description-section .grds .grd-2:nth-child(8)').text().trim();
    details.leaseTerm = $('.details-description-section .grds .grd-2:nth-child(10)').text().trim();
    details.location = $('.details-description-section .grds .grd-2:nth-child(12)').text().trim();
    details.distance = $('.details-description-section .grds .grd-2:nth-child(14)').text().trim();
    details.preferredGender = $('.details-description-section .grds .grd-2:nth-child(16)').text().trim();
    details.smoking = $('.details-description-section .grds .grd-2:nth-child(18)').text().trim();
    details.tenantType = $('.details-description-section .grds .grd-2:nth-child(20)').text().trim();
    details.description = $('.details-description-section .grds p').text().trim();
    details.amenities = $('.details-amenities-section .grds .grd-2').map((i, el) => $(el).text().trim()).get();
    details.contact = {
      name: $('.details-contact-section .message-to strong').text().trim(),
      phone: $('.details-contact-section span').text().trim().replace(/[^\d-]/g, '')
      

    };

    // Extract image URLs
    const imagesInput = $('#JSONImages').val();
    details.images = JSON.parse(imagesInput);

    //log the images array 

    return NextResponse.json(details);
  } catch (error) {
    console.error('Error fetching listing details:', error.message);
    return NextResponse.json({ error: 'Failed to fetch listing details' }, { status: 500 });
  }
}
