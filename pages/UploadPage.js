// UploadPage.js
// Page Object Model for the File Upload page

class UploadPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('input#file-upload');
    this.uploadButton = page.locator('input#file-submit');
    this.uploadedFile = page.locator('#uploaded-files');
    this.headerText = page.locator('h3');
  }

  // Navigate to the upload page
  async goto() {
    await this.page.goto('${baseURL}');
  }

  // Upload a file by path
  async uploadFile(filePath) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  // Get uploaded file name text
  async getUploadedFileName() {
    return await this.uploadedFile.textContent();
  }

  // Check if uploaded confirmation is visible
  async isUploadSuccessVisible() {
    return await this.uploadedFile.isVisible();
  }
}

module.exports = { UploadPage };