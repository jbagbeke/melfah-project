/**
 * Google Apps Script for handling film poster reviews
 * This script should be deployed as a Web App in Google Apps Script
 * 
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet for storing reviews
 * 5. Update the SHEET_ID constant below
 * 6. Deploy as Web App with execute permissions set to "Anyone"
 */

// Configuration - UPDATE THESE VALUES
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Reviews'; // Name of the sheet tab

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.poster || !data.rating || !data.poster_id) {
      return ContentService
        .createTextOutput(JSON.stringify({error: 'Missing required fields'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.getRange(1, 1, 1, 6).setValues([['Poster', 'Poster_ID', 'Name', 'Rating', 'Review', 'Timestamp']]);
      newSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    
    // Get the correct sheet reference
    const targetSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const rowData = [
      data.poster || '',
      data.poster_id || '',
      data.name || 'Anonymous',
      parseInt(data.rating) || 0,
      data.review || '',
      data.timestamp || new Date().toISOString()
    ];
    
    // Add the data to the sheet
    targetSheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Review added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({error: 'Failed to save review: ' + error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  try {
    // This can be used to test if the script is working
    return ContentService
      .createTextOutput(JSON.stringify({
        message: 'Film Poster Review API is working',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function to verify the script setup
 * You can run this manually in the Apps Script editor
 */
function testSetup() {
  try {
    // Test opening the sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      if (!sheet) {
      console.log('Sheet not found. Creating new sheet...');
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.getRange(1, 1, 1, 6).setValues([['Poster', 'Poster_ID', 'Name', 'Rating', 'Review', 'Timestamp']]);
      newSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      console.log('Sheet created successfully');
    } else {
      console.log('Sheet found successfully');
      console.log('Current data rows:', sheet.getLastRow());
    }
    
    // Test adding a sample review
    const testData = [
      'Test Poster',
      'test-poster',
      'Test User',
      5,
      'This is a test review',
      new Date().toISOString()
    ];
    
    sheet.appendRow(testData);
    console.log('Test review added successfully');
    
    return 'Setup test completed successfully';
    
  } catch (error) {
    console.error('Setup test failed:', error);
    return 'Setup test failed: ' + error.toString();
  }
}

/**
 * Function to clear all reviews (for testing purposes)
 * Run this manually if you need to reset the data
 */
function clearAllReviews() {  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (sheet && sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).clear();
      console.log('All reviews cleared');
    }
  } catch (error) {
    console.error('Error clearing reviews:', error);
  }
}
