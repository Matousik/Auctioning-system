import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import dbConnect from '../dbConnect';
import handler from '../pages/api/auctionEvent';
import { connect, closeDatabase, clearDatabase } from '../jest.setup';
import AuctionEvent from '../models/AuctionEvent';

// Assuming that AuctionEvent.create is a function that creates a new event.
jest.mock('../models/AuctionEvent');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Auction Event API', () => {
  it('should create a new auction event', async () => {
    const newEvent = {
      title: 'Test Event',
      description: 'This is a test event.',
      startDate: new Date(),
      endDate: new Date(),
    };

    // Create a mock request and response
    const req = httpMocks.createRequest<NextApiRequest>({
      method: 'POST',
      url: '/api/auctionEvent',
      body: newEvent,
    });

    const res = httpMocks.createResponse<NextApiResponse>();

    // Call the API route's handler function
    await handler(req, res);

    // Check the response data
    expect(res.statusCode).toEqual(201);
    expect(res._getJSONData()).toHaveProperty('data');
    expect(res._getJSONData().data).toHaveProperty('title', 'Test Event');
  });

  it('should get all auction events', async () => {
    // Create a mock request and response
    const req = httpMocks.createRequest<NextApiRequest>({
      method: 'GET',
      url: '/api/auctionEvent',
    });

    const res = httpMocks.createResponse<NextApiResponse>();

    // Call the API route's handler function
    await handler(req, res);

    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty('data');
    expect(Array.isArray(res._getJSONData().data)).toBe(true);
  });
});
