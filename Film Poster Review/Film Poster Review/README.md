# Google Sheets Review System Setup Guide

This guide will help you set up the Google Sheets backend for your film poster review system.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Film Poster Reviews" (or any name you prefer)
4. Note the Sheet ID from the URL (it's the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - Sheet ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script.js`
4. Update the `SHEET_ID` constant with your Google Sheet ID from Step 1
5. Save the project (give it a name like "Film Review API")

## Step 3: Deploy the Apps Script as a Web App

1. In Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone" (required for your website to submit reviews)
5. Click "Deploy"
6. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Publish Your Google Sheet as CSV

1. Go back to your Google Sheet
2. Click "File" → "Share" → "Publish to web"
3. Choose the "Reviews" sheet (or entire document)
4. Set format to "Comma-separated values (.csv)"
5. Check "Automatically republish when changes are made"
6. Click "Publish"
7. Copy the CSV URL

## Step 5: Update Your HTML File

In your `index.html` file, find the `GOOGLE_SHEETS_CONFIG` object and replace the placeholder URLs:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    // Replace with your Google Apps Script Web App URL from Step 3
    submitUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    // Replace with your published Google Sheets CSV URL from Step 4
    readUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?gid=0&single=true&output=csv'
};
```

### Example URLs to replace:

**submitUrl**: Replace `YOUR_SCRIPT_ID` with the actual script ID from your Apps Script deployment
- Example: `https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec`

**readUrl**: Replace `YOUR_SHEET_ID` with your Google Sheet ID from Step 1
- Example: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/pub?gid=0&single=true&output=csv`

## Step 6: Test the Setup

1. Open your updated `index.html` in a web browser
2. Try submitting a review for any poster
3. Check your Google Sheet to see if the review appears
4. Refresh the page to see if the review is displayed

## Troubleshooting

### Common Issues:

1. **Reviews not submitting**: 
   - Check that the Apps Script is deployed with "Anyone" access
   - Verify the submitUrl is correct
   - Check browser console for errors

2. **Reviews not displaying**:
   - Verify the Google Sheet is published to web as CSV
   - Check that the readUrl is correct
   - Ensure the sheet has the correct column headers: Poster, Name, Rating, Review, Timestamp

3. **CORS errors**:
   - These are normal when submitting to Google Apps Script (no-cors mode)
   - The submission should still work despite the console warning

### Testing the Apps Script:

1. In Apps Script editor, run the `testSetup()` function manually
2. Check the execution log for any errors
3. Verify that a test row appears in your Google Sheet

## Security Considerations

**Important**: This setup is for demonstration purposes only. For production use, consider:

- Rate limiting to prevent spam
- Input validation and sanitization
- Content moderation
- User authentication
- CAPTCHA protection

## File Structure

After setup, your project should have:
- `index.html` - Your main website file
- `google-apps-script.js` - The server-side code (deployed to Google Apps Script)
- This README file

The Google Sheet will automatically create the following structure:
| Poster | Poster_ID | Name | Rating | Review | Timestamp |
|--------|-----------|------|--------|--------|-----------|
| (Your review data will appear here) |
