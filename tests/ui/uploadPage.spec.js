const { test, expect } = require('@playwright/test');
const { UploadPage } = require('../../Pages/UploadPage');

test.describe('UI Test Suite: File Upload Feature', () => {

  test.beforeEach(async ({ page }) => {
    // Create a new instance of the UploadPage object
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
  });

  test('Should upload a file successfully', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const filePath = 'fixtures/testFile.txt';

    // Upload a file and verify the upload confirmation
    await uploadPage.uploadFile(filePath);
    await expect(uploadPage.uploadedFile).toContainText('testFile.txt');
    await expect(uploadPage.headerText).toHaveText('File Uploaded!');
  });

  test('Should show no confirmation when submitting without file', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    // Click submit without selecting a file
    await uploadPage.uploadButton.click();

    // Validate that no uploaded file name is shown
    await expect(uploadPage.uploadedFile).not.toBeVisible();
  });

  test('Should show correct UI elements', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    // Ensure all critical UI elements are present
    await expect(uploadPage.headerText).toHaveText('File Uploader');
    await expect(uploadPage.fileInput).toBeVisible();
    await expect(uploadPage.uploadButton).toBeVisible();
  });

});