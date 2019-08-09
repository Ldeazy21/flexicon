window.addEventListener('DOMContentLoaded', function() {
  const inputValueElement = document.getElementById('inputValue');
  const outputValueElement = document.getElementById('outputValue');
  const inputUnitElement = document.getElementById('inputUnit');
  const outputUnitElement = document.getElementById('outputUnit');
  const resultElement = document.getElementById('result');

  attachUnits(inputUnitElement, outputUnitElement);

  document.getElementById('submitButton').addEventListener('click', function() {
    var resultText = getConversion(
      Number(inputValueElement.value),
      inputUnitElement.value,
      Number(outputValueElement.value),
      outputUnitElement.value
    );

    resultElement.innerText = resultText;
  });
});

function attachUnits(inputUnitElement, outputUnitElement) {
  [...TEMPRATURE_UNITS_LIST, ...VOLUME_UNITS_LIST].forEach(unitName => {
    const optionHTML = `<option value="${unitName}">${unitName}</option>`;
    inputUnitElement.innerHTML += optionHTML;
    outputUnitElement.innerHTML += optionHTML;
  });
}
