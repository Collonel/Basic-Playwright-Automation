// Import Playwright's test and expect functions
const { test, expect } = require('@playwright/test');

// Base URL for the API endpoints
const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Test Suite: JSONPlaceholder /posts Endpoint', () => {

  // Test1: Verify GET /posts endpoint returns all posts
  test('GET /posts - Return all posts', async ({ request }) => {
     // Make GET request to fetch all posts
    const response = await request.get(`${BASE_URL}/posts`);
    
    // Verify response is successful (status 200-299)
    expect(response.ok()).toBeTruthy();
    // Verify response status code is 200
    expect(response.status()).toBe(200);

    // Parse response body as JSON
    const posts = await response.json();
    // Verify we received an array of posts or at least one post
    expect(posts.length).toBeGreaterThan(0);

    // Validate structure of one post object
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('GET /posts/:id - Return specific post by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    expect(response.ok()).toBeTruthy();

    const post = await response.json();
    expect(post.id).toBe(1);
  });

  test('GET /posts/:id - Invalid ID returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/99999`);
    expect(response.status()).toBe(404);
  });

  test('POST /posts - Create a new post', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        title: 'New Post',
        body: 'This is a new post.',
        userId: 101
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id'); // new post ID returned
    expect(body.title).toBe('New Post');
  });

  test('PUT /posts/:id - Replace existing post', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: {
        id: 1,
        title: 'Updated Title',
        body: 'Updated content',
        userId: 1
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.title).toBe('Updated Title');
  });

  test('PATCH /posts/:id - Partially update a post', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/posts/1`, {
      data: {
        title: 'Patched Title'
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.title).toBe('Patched Title');
  });

  test('DELETE /posts/:id - Delete a post', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200); // JSONPlaceholder always returns 200
  });

});