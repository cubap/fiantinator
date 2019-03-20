/**
 * adapted from http://aulis.org/Calendar/Regnal_Years_files/widget1_markup.html
 */
function ParseNumeral(numeral){
    let	str = numeral.toUpperCase()
    let validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/
    let num = 0
    if (!(str && validator.test(str))) { 
        throw new Error(str+" is not convertible to an integer")
    } else {
        let token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g
        let key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
        let i
        while (i = token.exec(str)) {
            num += key[i[0]]
        }
    }
    return num
}

/**
 * 
 * @param {number} day 1-31 day of the month
 * @param {number} month 0-11 month of the year
 * @param {string} year roman numeral of Elizabeth I reign
 */
export function ConvertRegnal(day,month,year) {
    let regnalyear
    try {
        regnalyear = ParseNumeral(year)
    } catch (err) {return}
    if (isNaN(regnalyear)) {
        throw new Error("You must enter a regnal year. Could not understand "+year)
    }
    if (regnalyear > 45) {
        throw new Error("Elizabeth I only reigned for 45 years")
    }
    regnalyear = ((month < 10) || (month == 10) && (day < 17)) ? regnalyear + 1558 : regnalyear + 1557
    if (regnalyear < 1753) {
        if (month == 2) {
            if (day < 25) {
                let NS = regnalyear
                NS = NS % 10
                console.log((regnalyear-1) + "/" + NS + " is more precise...")
            }
        }
        if (month < 2) {
            let NS = regnalyear % 10
            if (NS == 0) {
                NS = regnalyear % 100
            }
            if (NS == 0) {
                NS = regnalyear
            }
            console.log((regnalyear-1) + "/" + NS + " is more precise...")
        }
    }
    let date = [
        regnalyear,
        (month.length===2)?++month:"0"+(++month),
        (day.length===2)?day:"0"+day
    ].join('-')
    return date
}