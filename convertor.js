// constants
const TEMP_UNITS = {
  C: 'Celsius',
  K: 'Kelvin',
  R: 'Rankine',
  F: 'Fahrenheit',
};

const VOLUME_UNITS = {
  liters: 'Liters',
  tablespoons: 'Tablespoons',
  cubicInches: 'Cubic-inches',
  cups: 'Cups',
  cubicFeet: 'Cubic-feet',
  gallons: 'Gallons',
};

const RESPONSE = {
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
  INVALID: 'INVALID',
};

const TEMPRATURE_UNITS_LIST = Object.values(TEMP_UNITS); // [Celsius, Kelvin, Rankine, Fahrenheit]
const VOLUME_UNITS_LIST = Object.values(VOLUME_UNITS); // [ Liters, Tablespoons, Cubic-inches, Cups, Cubic-feet, Gallons]


// || &&

//  TR

// main function to convert
function getConversion(inputVal, inputUnit, outputVal, outputUnit) {
  if (isNaN(inputVal) || isNaN(outputVal)) return RESPONSE.INVALID;

  const bothUnitsForTemprature =
    TEMPRATURE_UNITS_LIST.includes(inputUnit) &&
    TEMPRATURE_UNITS_LIST.includes(outputUnit);


  const bothUnitsForVolume =
    VOLUME_UNITS_LIST.includes(inputUnit) &&
    VOLUME_UNITS_LIST.includes(outputUnit);

  if (
    (bothUnitsForTemprature || bothUnitsForVolume) &&
    inputUnit === outputUnit
  ) {
    return round(inputVal) === round(outputVal)
      ? RESPONSE.CORRECT
      : RESPONSE.INCORRECT;
  }

  // if input and output units (bothUnits) are of temperature then:
  if (bothUnitsForTemprature) {
    const result = temperatureConvertor(inputVal, inputUnit, outputUnit);
    if (round(result) === round(outputVal)) return RESPONSE.CORRECT;
    return RESPONSE.INCORRECT;
  }

  // if input and output units (bothUnits) are of voulume then:
  if (bothUnitsForVolume) {
    const result = volumeConvertor(inputVal, inputUnit, outputUnit);
    if (round(result) === round(outputVal)) return RESPONSE.CORRECT;
    return RESPONSE.INCORRECT;
  }

  // return invalid if all of above conditions fail
  return RESPONSE.INVALID;
}

// Helper functions:

function volumeConvertor(inputVal, inputUnit, outputUnit) {
  const conversionMap = {
    [VOLUME_UNITS.liters]: 1,
    [VOLUME_UNITS.tablespoons]: 67.628,
    [VOLUME_UNITS.cubicInches]: 61.0237,
    [VOLUME_UNITS.cups]: 4.22675,
    [VOLUME_UNITS.cubicFeet]: 0.0353147,
    [VOLUME_UNITS.gallons]: 0.264172,
  };
  let conversionFactor = conversionMap[outputUnit] / conversionMap[inputUnit];

  return inputVal * conversionFactor;
}

function temperatureConvertor(inputVal, inputUnit, outputUnit) {
  let result = null;

  if (inputUnit === TEMP_UNITS.C) {
    switch (outputUnit) {
      case TEMP_UNITS.F:
        result = inputVal * 1.8 + 32;
        break;
      case TEMP_UNITS.K:
        result = inputVal + 273.15;
        break;
      case TEMP_UNITS.R:
        result = ((inputVal + 273.15) * 9) / 5;
        break;
      default:
        result = null;
        break;
    }
  }
  if (inputUnit === TEMP_UNITS.F) {
    switch (outputUnit) {
      case TEMP_UNITS.C:
        result = (inputVal - 32) / 1.8;
        break;
      case TEMP_UNITS.K:
        result = (inputVal - 32) / 1.8 + 273.15;
        break;
      case TEMP_UNITS.R:
        result = inputVal + 459.67;
        break;
      default:
        result = null;
        break;
    }
  }
  if (inputUnit === TEMP_UNITS.K) {
    switch (outputUnit) {
      case TEMP_UNITS.C:
        result = inputVal - 273.15;
        break;
      case TEMP_UNITS.F:
        result = (inputVal - 273.15) * 1.8 + 32;
        break;
      case TEMP_UNITS.R:
        result = (inputVal * 9) / 5;
        break;
      default:
        result = null;
        break;
    }
  }
  if (inputUnit === TEMP_UNITS.R) {
    switch (outputUnit) {
      case TEMP_UNITS.C:
        result = ((inputVal - 491.67) * 5) / 9;
        break;
      case TEMP_UNITS.F:
        result = inputVal - 459.67;
        break;
      case TEMP_UNITS.K:
        result = (inputVal * 5) / 9;
        break;
      default:
        result = null;
        break;
    }
  }

  return result;
}

function round(num) {
  return parseFloat(num).toFixed(1);
}
