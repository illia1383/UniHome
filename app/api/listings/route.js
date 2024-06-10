import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'https://offcampus.uwo.ca/listings/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const listings = [];
    $('.rental-listing').each((index, element) => {
      try {
        const address = $(element).find('.rental-listing-details h2 a').first().text().trim();
        const bedroomstext = $(element).find('.rental-listing-details h3').text().trim().split(',')[1];
        const bedrooms = parseInt(bedroomstext.replace(/[^\d]/g, ''), 10);

        const priceText = $(element).find('.rental-listing-details h3 strong').text().trim();
        const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
        const description = $(element).find('.rental-listing-details div p').text().trim();
        const available = $(element).find('.rental-listing-details h4').text().trim();

        // Ensure the href attribute is correctly extracted
        const href = $(element).find('.rental-listing-details h2 a').first().attr('href');
        const listingId = href ? href.split('/').pop() : null;

        const imageUrl = $(element).find('.rental-listing-img').css('background-image');
        const image = imageUrl ? imageUrl.replace(/url\(|\)|"|'/g, '') : null;
        // Log the elements to help debug
        console.log({
          address, price, description, available, bedrooms, listingId, href, imageUrl, image 
        });

        if (listingId) {
          listings.push({ address, price, description, available, bedrooms, listingId, image  });
        } else {
          console.warn('Failed to extract listing ID for element:', element);
        }
      } catch (error) {
        console.error('Error processing listing element:', error.message, element);
      }
    });

    console.log('Scraped Listings:', listings); // Log the scraped listings
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error.message); // Log the error message
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
