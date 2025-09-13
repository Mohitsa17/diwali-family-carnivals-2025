/**
 * Google Apps Script for Diwali Family Carnival Registration Webhook
 * 
 * Instructions for setup:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a new Google Spreadsheet
 * 5. Create sheets named: "SuperMom", "CutestBaby", "SeniorCitizens", "GeneralJoiners"
 * 6. Copy the Spreadsheet ID from the URL
 * 7. Replace 'YOUR_SPREADSHEET_ID' below with your actual Spreadsheet ID
 * 8. Deploy as web app with execute permissions for "Anyone"
 * 9. Copy the web app URL and use it as GOOGLE_SHEETS_WEBHOOK in your .env file
 */

// Replace this with your actual Google Spreadsheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data for debugging
    console.log('Received data:', data);
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Determine which sheet to write to based on the contest
    let sheetName;
    switch(data.contest) {
      case 'SUPERMOM':
        sheetName = 'SuperMom';
        break;
      case 'CUTESTBABY':
        sheetName = 'CutestBaby';
        break;
      case 'SENIORCITIZEN':
        sheetName = 'SeniorCitizens';
        break;
      case 'GENERAL':
      case 'NONE':
      default:
        sheetName = 'GeneralJoiners';
        break;
    }
    
    // Get or create the sheet
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      // Add headers if it's a new sheet
      sheet.getRange(1, 1, 1, 11).setValues([[
        'Timestamp',
        'Name',
        'Age',
        'WhatsApp',
        'Email',
        'Contest',
        'Message',
        'Photo URL',
        'Video URL',
        'IP Address',
        'Registration ID'
      ]]);
      // Format headers
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 11).setBackground('#f0f0f0');
    }
    
    // Prepare the row data
    const rowData = [
      new Date(data.timestamp || new Date()),
      data.name || '',
      data.age || '',
      data.whatsapp || '',
      data.email || '',
      data.contest || 'NONE',
      data.message || '',
      data.photoUrl || '',
      data.videoUrl || '',
      data.ipAddress || '',
      data.id || ''
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 11);
    
    // Send notification email (optional)
    sendNotificationEmail(data, sheetName);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        sheet: sheetName
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing data:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(data, sheetName) {
  try {
    // Replace with your email address
    const adminEmail = 'admin@example.com';
    
    const subject = `New Registration - ${data.contest} Contest`;
    const body = `
      New registration received for Diwali Family Carnival:
      
      Name: ${data.name}
      Age: ${data.age || 'Not provided'}
      WhatsApp: ${data.whatsapp}
      Email: ${data.email || 'Not provided'}
      Contest: ${data.contest}
      Message: ${data.message || 'Not provided'}
      Photo: ${data.photoUrl ? 'Yes' : 'No'}
      Video: ${data.videoUrl ? 'Yes' : 'No'}
      Timestamp: ${new Date(data.timestamp || new Date()).toLocaleString()}
      
      Data saved to sheet: ${sheetName}
    `;
    
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    name: 'Test User',
    age: 25,
    whatsapp: '9876543210',
    email: 'test@example.com',
    contest: 'SUPERMOM',
    message: 'Test registration',
    timestamp: new Date().toISOString(),
    id: 'test-123'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
