import React, { useState } from 'react';

const FuelPumpCalculator = () => {
  const [engineHP, setEngineHP] = useState(0);
  const [baseFuelPressure, setBaseFuelPressure] = useState(0);
  const [boostPressure, setBoostPressure] = useState(0);
  const [results, setResults] = useState({
    gasolineNaturallyAspirated: '',
    gasolineForcedInduction: '',
    e85NaturallyAspirated: '',
    e85ForcedInduction: '',
  });

  const calculateFuelPumpFlow = () => {
    // Get user inputs
    // Use the state variables instead of document.getElementById
    const engineHPValue = parseFloat(engineHP) || 0;
    const baseFuelPressureValue = parseFloat(baseFuelPressure) || 0;
    const boostPressureValue = parseFloat(boostPressure) || 0;

    // Calculate conversion factors and results
    const conversionFactorGasolineNaturallyAspiratedLph = engineHPValue * 0.35;
    const conversionFactorGasolineForcedInductionLph = engineHPValue * 0.42;
    const conversionFactorE85NaturallyAspiratedLph = engineHPValue * 0.431;
    const conversionFactorE85ForcedInductionLph = engineHPValue * 0.512;

    const gasolineNaturallyAspiratedFlowLph = conversionFactorGasolineNaturallyAspiratedLph.toFixed(2);
    const gasolineForcedInductionFlowLph = conversionFactorGasolineForcedInductionLph.toFixed(2);
    const e85NaturallyAspiratedFlowLph = conversionFactorE85NaturallyAspiratedLph.toFixed(2);
    const e85ForcedInductionFlowLph = conversionFactorE85ForcedInductionLph.toFixed(2);

    const gasolineNaturallyAspiratedFlowPsi = baseFuelPressureValue.toFixed(2);
    const gasolineForcedInductionFlowPsi = (baseFuelPressureValue + boostPressureValue).toFixed(2);
    const e85NaturallyAspiratedFlowPsi = baseFuelPressureValue.toFixed(2);
    const e85ForcedInductionFlowPsi = (baseFuelPressureValue + boostPressureValue).toFixed(2);

    // Set the results in state
    setResults({
      gasolineNaturallyAspirated: `${gasolineNaturallyAspiratedFlowLph} Lph @ ${gasolineNaturallyAspiratedFlowPsi} Psi`,
      gasolineForcedInduction: `${gasolineForcedInductionFlowLph} Lph @ ${gasolineForcedInductionFlowPsi} Psi`,
      e85NaturallyAspirated: `${e85NaturallyAspiratedFlowLph} Lph @ ${e85NaturallyAspiratedFlowPsi} Psi`,
      e85ForcedInduction: `${e85ForcedInductionFlowLph} Lph @ ${e85ForcedInductionFlowPsi} Psi`,
    });
  };

  // Event listener for Enter key press on input fields
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      calculateFuelPumpFlow();
    }
  };

  return (
    <div className="container">
      <div className="form-container">
      <h1>Fuel Pump Flow Calculator</h1>
        <form>
          <label htmlFor="engineHP">Target Engine Horsepower (HP):</label>
          <input
            type="number"
            id="engineHP"
            value={engineHP}
            onChange={(e) => setEngineHP(e.target.value)}
            onKeyDown={handleEnterKey} // Event listener for Enter key press
          />

          <label htmlFor="baseFuelPressure">Base Fuel Pressure (Psi):</label>
          <input
            type="number"
            id="baseFuelPressure"
            value={baseFuelPressure}
            onChange={(e) => setBaseFuelPressure(e.target.value)}
            onKeyDown={handleEnterKey} // Event listener for Enter key press
          />

          <label htmlFor="boostPressure">Boost Pressure (Psi):</label>
          <input
            type="number"
            id="boostPressure"
            value={boostPressure}
            onChange={(e) => setBoostPressure(e.target.value)}
            onKeyDown={handleEnterKey} // Event listener for Enter key press
          />

          <button type="button" onClick={calculateFuelPumpFlow}>
            Calculate
          </button>
        </form>
      </div>

      <div className="results-container">
        <div className="results-box">
          <h2>Gasoline</h2>
          <p>Naturally Aspirated: {results.gasolineNaturallyAspirated}</p>
          <p>Forced Induction: {results.gasolineForcedInduction}</p>
        </div>
        <div className="results-box">
          <h2>E85</h2>
          <p>Naturally Aspirated: {results.e85NaturallyAspirated}</p>
          <p>Forced Induction: {results.e85ForcedInduction}</p>
        </div>
      </div>
    </div>
  );
};

export default FuelPumpCalculator;
