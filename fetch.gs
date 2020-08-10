function fetch_competencies() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("competencies");

  // Get Definition of Competency List
  for (let i = 3; i <= sheet.getLastRow(); i++) {
    if (!sheet.getRange(i, 4).isBlank()) {
      var competencyName = sheet.getRange(i, 4).getValue();
      var json = UrlFetchApp.fetch("https://raw.githubusercontent.com/dskst/em-competency-matrix/main/" + competencyName).getContentText();
      var competencies = JSON.parse(json);

      // Write each competency in the column
      var columnNumber = 5
      for (var competency in competencies) {
        // Only process competency levels
        if (!competency.match(/^L[1-6]$/)) {
          continue;
        }
        sheet.getRange(i, columnNumber++).setValue(competencies[competency].summary + "\n" + competencies[competency].detail);
      }
    }
  } 
}
