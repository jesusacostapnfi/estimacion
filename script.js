function calculateEstimation() {
    const estimationType = document.getElementById('estimationType').value;

    if (estimationType === 'pointMean') {
        const dataInput = document.getElementById('meanData').value;
        const dataArray = dataInput.split(',').map(Number).filter(Number.isFinite);

        if (dataArray.length === 0) {
            document.getElementById('result').textContent = "Por favor, ingresa datos válidos.";
            return;
        }

        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const mean = sum / dataArray.length;
        document.getElementById('result').textContent = `Media muestral: ${mean.toFixed(2)}`;
    } else if (estimationType === 'pointProportion') {
        const successes = parseInt(document.getElementById('successes').value);
        const totalTrials = parseInt(document.getElementById('totalTrials').value);

        if (isNaN(successes) || isNaN(totalTrials) || totalTrials <= 0 || successes < 0 || successes > totalTrials) {
            document.getElementById('result').textContent = "Por favor, ingresa datos válidos.";
            return;
        }

        const proportion = successes / totalTrials;
        document.getElementById('result').textContent = `Proporción muestral: ${proportion.toFixed(2)}`;
    } else if (estimationType === 'intervalMean') {
        const mean = parseFloat(document.getElementById('meanInterval').value);
        const stdDev = parseFloat(document.getElementById('stdDev').value);
        const sampleSize = parseInt(document.getElementById('sampleSize').value);
        const confidenceLevel = parseFloat(document.getElementById('confidenceLevel').value);

        if (isNaN(mean) || isNaN(stdDev) || isNaN(sampleSize) || sampleSize <= 0 || stdDev < 0) {
            document.getElementById('result').textContent = "Por favor, ingresa datos válidos.";
            return;
        }

        let z;
        switch (confidenceLevel) {
            case 0.90: z = 1.645; break;
            case 0.95: z = 1.96; break;
            case 0.99: z = 2.576; break;
            default: z = 1.96;
        }

        const standardError = stdDev / Math.sqrt(sampleSize);
        const marginOfError = z * standardError;
        const lowerBound = mean - marginOfError;
        const upperBound = mean + marginOfError;

        document.getElementById('result').textContent = `Intervalo de confianza (${confidenceLevel * 100}%): (${lowerBound.toFixed(2)}, ${upperBound.toFixed(2)})`;
    }
}