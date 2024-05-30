// numberFormatSpeech returns numbers as strings formatted so they sound nicer when spoken

export function numberFormatSpeech(num) {
  if ( num > 0 ) {
      if ( num >= 1000000000 ) { 

          if ((num / 1000000000) % 1 == 0) {
              return ( num / 1000000000 ) + ' billion' 
          }
          else {
              return ( num / 1000000000 ).toFixed(1) + ' billion' 
          }
          
          }
      if ( num >= 1000000 ) { 

          if (( num / 1000000 ) % 1 == 0) {
            return ( num / 1000000 ) + ' million' 
          }  
          else {
            return ( num / 1000000 ).toFixed(1) + ' million' 
          }
          
          }

      if (num % 1 != 0) { 
          return num.toFixed(2)
        }
      else { return num }
  }
  if ( num < 0 ) {
      var posNum = num * -1;
      if ( posNum >= 1000000000 ) return [ "-" + String(( posNum / 1000000000 ).toFixed(1)) + ' billion'];
      if ( posNum >= 1000000 ) return ["-" + String(( posNum / 1000000 ).toFixed(1)) + ' million'];
      else { return num }
  }
  return num;
}

// getBrowser tells us the browser so we can adjust the web speech API settings as needed

export function getBrowser() {
    let browserInfo = navigator.userAgent;
    let browser;
    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox'
    } else {
      browser = 'unknown'
    }
      return browser;
  }

// yearText Formats year strings into text that sounds nicer when spoken

export function yearText(year) {

	if (year.length !=4) {
		console.log("Error, not a year string")
		return year
	} 

	else {
		let partOne = year.slice(0,2)
		let partTwo = year.slice(2,4)
		let checkZero = year.slice(2,3)

		if (year != "2000" && partTwo == "00") {
			
			partTwo = "hundred"
		}

		else if (year == "2000") {
			partOne = "two thousand"
			partTwo  = ""
		}

		else if (checkZero == "0") {

			let lastNum = year.slice(3,4)
			partTwo = "oh " + lastNum
		}

		return `${partOne} ${partTwo}`
	}	
	
}

export function xFormatting(settings) {

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
  
  export function getValue(obj, key) {
    if (key in obj) {
        return obj[key]
    }

    else {
        return null
    }
  }

  export function checkNull(obj, key) {
    let result = null
    if (obj) {
      if (key in obj) {
        if (obj[key] != "") {
          return obj[key]
        }
      }
      return result
    }
    else {
      return result
    }
  }


  export function merge(to, from) {

    for (const n in from) {
        if (typeof to[n] != 'object') {
          to[n] = from[n];
        } else if (typeof from[n] == 'object') {
            to[n] = merge(to[n], from[n]);
        }
    }
  
    return to;
  
  };

  export function contains(a, b) {

    if (Array.isArray(b)) {
        return b.some(x => a.indexOf(x) > -1);
    }
  
    return a.indexOf(b) > -1;
  
  }

  export function analyseTime(data, settings) {
    let results = {}
    results.interval = null
    results.timescale = null
    results.suggestedFormat = null
    let xVar = null 
    let dataKeys = Object.keys(data[0])
  
    let xColumn = checkNull(settings, 'xColumn')
    if (!xColumn) {
      xVar = dataKeys[0]
    }
    else {
      xVar = xColumn
    }
  
    let time1 = data[0][xVar]
    let time2 = data[1][xVar]
   
    let timeDiff = Math.abs(time2 - time1); // difference in milliseconds
  
    // Define time constants
    const ONE_HOUR = 1000 * 60 * 60;
    const ONE_DAY = ONE_HOUR * 24;
    const ONE_WEEK = ONE_DAY * 7;
    const ONE_MONTH = ONE_DAY * 28; // approximate
    const ONE_QUARTER = ONE_MONTH * 3; // approximate
    const ONE_YEAR = ONE_DAY * 365;
  
    // Determine the appropriate time unit and strftime format
    if (timeDiff < ONE_DAY) {
      results.interval = timeDiff / ONE_HOUR;
      results.timescale = 'hour';
      results.suggestedFormat = '%H:%M'; // hours and minutes
    } else if (timeDiff < ONE_WEEK) {
      results.interval = timeDiff / ONE_DAY;
      results.timescale = 'day';
      results.suggestedFormat = '%d %b'; // day and month
    } else if (timeDiff < ONE_MONTH) {
      results.interval = timeDiff / ONE_WEEK;
      results.timescale = 'week';
      results.suggestedFormat = '%d %b'; // week of the year
    } else if (timeDiff < ONE_QUARTER) {
      results.interval = timeDiff / ONE_MONTH;
      results.timescale = 'month';
      results.suggestedFormat = '%B %Y'; // month and year
    } 
    else if (timeDiff < ONE_YEAR) {
      results.interval = timeDiff / ONE_QUARTER;
      results.timescale = 'quarter';
      results.suggestedFormat = '%B %Y'; // month and year
    }
    else {
      results.interval = timeDiff / ONE_YEAR;
      results.timescale = 'year';
      results.suggestedFormat = '%Y'; // year
    }
  
    return results;
  
  }

  import { timeFormat } from "d3-time-format";

export function xvarFormatSpeech(xVar, format) {
    // check for date objects
    // console.log(xVar, format)
    if (typeof xVar == "object") {
      
      let timeFormatter = timeFormat(format)
      let result = timeFormatter(xVar)
      if (format == "%Y") {
        result = yearText(result)
      }
      return result
    }
    
    else {
      return xVar
    }
  
  }