function numberFormatSpeech(num) {
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

export default numberFormatSpeech