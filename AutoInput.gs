function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const price = sheet.getRange('N1').getValue();
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Form');
  htmlOutput.append("<script>const price = " + price + ";</script>");
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}

function inputCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const price = sheet.getRange('N1').getValue();
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Form')
    .setWidth(450)
    .setHeight(350);
  htmlOutput.append("<script>const price = " + price + ";</script>");
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, '会計');
}

function processInput(sugarCount, kinakoCount, cocoaCount, matchaCount, receivedAmount) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow() + 1;
  Logger.log(sheet.getLastRow())
  const startRow = 2;
  const rowToUse = Math.max(lastRow, startRow);
  const customerID = (rowToUse - startRow + 1);

  // Timestamp
  const timestamp = new Date();

  // Write to the sheet
  sheet.getRange(rowToUse, 1).setValue(customerID);
  sheet.getRange(rowToUse, 2).setValue(sugarCount);
  sheet.getRange(rowToUse, 3).setValue(kinakoCount);
  sheet.getRange(rowToUse, 4).setValue(cocoaCount);
  sheet.getRange(rowToUse, 5).setValue(matchaCount);
  sheet.getRange(rowToUse, 6).setValue(sheet.getRange('N1').getValue());
  sheet.getRange(rowToUse, 7).setValue("=SUM(B" + rowToUse + ":E" + rowToUse + ")");
  sheet.getRange(rowToUse, 8).setValue("=(G" + rowToUse +" * N1)");
  sheet.getRange(rowToUse, 9).setValue(receivedAmount);
  sheet.getRange(rowToUse, 10).setValue("=(I" + rowToUse + "-" + "H" + rowToUse + ")");
  sheet.getRange(rowToUse, 11).setValue(timestamp);
}
