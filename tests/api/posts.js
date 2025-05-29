const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Test Suite: JSONPlaceholder /posts Endpoint', () => {

  test('GET /posts - Retrieve all posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    expect(response.ok()).toBeTruthy();

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);

    // Validate structure of one post object
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('GET /posts/:id - Retrieve specific post by ID', async ({ request }) => {
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