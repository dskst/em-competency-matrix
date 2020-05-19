function myFunction() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("competencies");

  // コンピテンシー一覧の定義を取得する
  for (let i = 3; i <= sheet.getLastRow(); i++) {
    if (!sheet.getRange(i, 4).isBlank()) {
      var competencyName = sheet.getRange(i, 4).getValue();
      var json = UrlFetchApp.fetch("https://raw.githubusercontent.com/dskst/em-competency-matrix/master/" + competencyName).getContentText();
      var competencies = JSON.parse(json);

      // 各コンピテンシーをカラムに書き込む
      var columnNumber = 5
      for (var competency in competencies) {
        sheet.getRange(i, columnNumber++).setValue(competencies[competency].summary + "\n" + competencies[competency].detail);
      }
    }
  } 
}
