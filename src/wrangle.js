// This is a cut-down version of the data pre-processing function from YachtCharter
// import dataTools from "../dataTools"
// import ColorScale from "./colorscale"

/*
/
/ wrangle is the data processing function
/
*/

export function wrangle(data, settings) {

  let dataKeys = Object.keys(data)

  let wrangleSettings = {}

  wrangleSettings.keys = dataKeys

  for (let row of data[key]) {

    for (let cell of dataKeys) {

      if (row[cell] === "0" || row[cell] === "0.0") {

        row[cell] = 0

      }

      if (row[cell] === "") {

        row[cell] = null

      }

      /*
      / Handle numbers with commas
      */

      if (row[cell] && typeof row[cell] === "string"  && row[cell].includes(",")) {

        if (!isNaN(row[cell].replace(/,/g, ""))) {

          row[cell] = +row[cell].replace(/,/g, "")

        }

      }

      row[cell] = (typeof row[cell] === "string" && !isNaN(row[cell])) ? +row[cell] : row[cell]

    }
  
  }


  /*
  / Figure out the format of the designated xColumn or column1
  / check if it is a date, a string
  */

let xColumn = getValue(settings, 'xColumn')

if (!xColumn) {
    xColumn = dataKeys[0]
}

settings["xFormat"] = xFormatting(settings)
console.log(settings["xFormat"])




  /*
  / change dateFormat var to xFormat... types to be datastring, number, string
  */

  if (settings["dateFormat"]) {

    console.log(`Set date format to ${settings["dateFormat"]}`)

    /*
    / Handle dates - set parseTime if it is a date... 
    / replaced all instances of dateParse with parseTime
    / Add date detection for xColumn to linechart, stacked bar, stackedarea, smallmultiples... 
    / use xFormat variable (req dateFormat and dateParse, xAxisDateFormat needs a default)
    */

    settings.parseTime = (settings["dateFormat"]!="") ? d3.timeParse(settings["dateFormat"]) : null


  }

  /*
  / Set xAxisDateFormat
  */

  if (settings["xAxisDateFormat"]) {

    if (settings["xAxisDateFormat"] != "") {

      settings["xAxisDateFormat"] = d3.timeFormat(settings["xAxisDateFormat"])

    } else {

      if (settings["dateParse"]) {

        settings["xAxisDateFormat"] = d3.timeFormat("%d %b '%y")

      }

    }

  }

  // console.log(Object.keys(settings))

  // console.log(settings)

  return settings

}


function xFormatting(settings) {

    let xData = { date : false, string : false , number : false, status : "", type : null }
  
  
    if (!settings["xColumn"]) {
  
      xData.status = "The xColumn is not defined"
  
    } else {
  
      let data = settings.data.map(d => d[settings["xColumn"]].toString() )
  
      const dateFormat =
      testDateFormatSp1(data) ||
      testDateFormatSp2(data) ||
      testDateFormats(data, formatList, 5) ||
      testDateFormatSp3(data) ||
      testDateFormatSp4(data);
  
      if (dateFormat && settings["dateFormat"]) {
        xData.date = true;
        xData.type = 'date';
        xData.status = "".concat(settings.data[0][settings["xColumn"]], " from the ").concat(settings["xColumn"], " inferred as date based on dateFormat");
      }
  
      else if (typeof settings.data[0][settings["xColumn"]] == 'number') {
        xData.number = true
        xData.type = 'number'
        xData.status = `The ${settings["xColumn"]} contains number data`
      }
  
      else if (typeof settings.data[0][settings["xColumn"]] == 'string') {
        xData.string = true
        xData.type = 'string'
        xData.status = `The ${settings["xColumn"]} contains string data`
      }
  
    }
  
    return xData
  
  }