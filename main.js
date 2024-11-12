// Bar Chart: Algeria Population Over the Years
const populationCanvas = document.getElementById("populationChart");
const populationCtx = populationCanvas.getContext("2d");

const populationData = [
  { year: "24", population: 46.81 },
  { year: "23", population: 46.16 },
  { year: "22", population: 45.48 },
  { year: "20", population: 44.04 },
  { year: "15", population: 40.02 },
  { year: "10", population: 36.19 },
  { year: "05", population: 33.11 },
  { year: "2000", population: 30.9 },
  { year: "95", population: 28.47 },
  { year: "90", population: 25.38 },
  { year: "85", population: 22.01 },
  { year: "80", population: 18.61 },
  { year: "75", population: 15.68 },
  { year: "70", population: 13.78 },
  { year: "65", population: 12.37 },
  { year: "60", population: 11.42 },
  { year: "55", population: 10.25 },
];

const maxPopulation = Math.max(
  ...populationData.map((item) => item.population)
); // Find max population
const chartWidth = populationCanvas.width - 100;
const chartHeight = populationCanvas.height - 100;

function drawPopulationChart() {
  const barWidth = chartWidth / populationData.length;
  const barGap = 10;
  const xOffset = 50;
  const yOffset = populationCanvas.height - 50;

  // Title
  populationCtx.font = "px Arial";
  populationCtx.textAlign = "center";
  populationCtx.fillText(
    "Algeria Population Over the Years",
    populationCanvas.width / 2,
    30
  );

  // X and Y axis
  populationCtx.beginPath();
  populationCtx.moveTo(xOffset, yOffset);
  populationCtx.lineTo(xOffset, 50);
  populationCtx.stroke();

  populationCtx.beginPath();
  populationCtx.moveTo(xOffset, yOffset);
  populationCtx.lineTo(xOffset + chartWidth, yOffset);
  populationCtx.stroke();

  // Y-axis gridlines and labels
  const yStep = chartHeight / 5;
  for (let i = 0; i <= 5; i++) {
    const yValue = Math.round((maxPopulation / 5) * i);
    populationCtx.fillText(yValue, xOffset - 30, yOffset - yStep * i);
    populationCtx.beginPath();
    populationCtx.moveTo(xOffset, yOffset - yStep * i);
    populationCtx.lineTo(xOffset + chartWidth, yOffset - yStep * i);
    populationCtx.setLineDash([5, 5]);
    populationCtx.stroke();
    populationCtx.setLineDash([]);
  }

  // Bars
  populationData.forEach((data, index) => {
    const barHeight = (data.population / maxPopulation) * chartHeight;
    const xPos = xOffset + index * barWidth;
    const yPos = yOffset - barHeight;
    const barColor = "#4CAF50";

    // Draw bar
    populationCtx.fillStyle = barColor;
    populationCtx.fillRect(
      xPos + barGap / 2,
      yPos,
      barWidth - barGap,
      barHeight
    );

    // Draw year labels
    populationCtx.fillStyle = "#000";
    populationCtx.fillText(data.year, xPos + barWidth / 2, yOffset + 20);
  });
}

drawPopulationChart();

// Pie Chart: Economy Data
const economyCanvas = document.getElementById("economyChart");
const economyCtx = economyCanvas.getContext("2d");

const economyData = [
  { name: "Agriculture", value: 10.5, color: "#ff6347" },
  { name: "Fuel", value: 17.8, color: "#ffcc00" },
  { name: "Industry", value: 5.8, color: "#90ee90" },
  { name: "Construction", value: 10.8, color: "#87cefa" },
  { name: "Services", value: 49.1, color: "#ff1493" },
  { name: "Taxes", value: 6, color: "#adff2f" },
];

const totalValue = economyData.reduce((sum, item) => sum + item.value, 0);
let startAngle = 0;

function drawEconomyChart() {
  economyData.forEach((item) => {
    const sliceAngle = (item.value / totalValue) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    // Draw pie slice
    economyCtx.beginPath();
    economyCtx.moveTo(300, 300); // Center of canvas
    economyCtx.arc(300, 300, 200, startAngle, endAngle);
    economyCtx.fillStyle = item.color;
    economyCtx.fill();
    economyCtx.stroke();

    startAngle = endAngle;
  });

  // Labels for Pie Chart
  startAngle = 0;
  economyData.forEach((item) => {
    const sliceAngle = (item.value / totalValue) * 2 * Math.PI;
    const labelAngle = startAngle + sliceAngle / 2;
    const x = 300 + Math.cos(labelAngle) * 150;
    const y = 300 + Math.sin(labelAngle) * 150;

    economyCtx.fillStyle = "#000";
    economyCtx.font = "14px Arial";
    economyCtx.fillText(`${item.name}: ${item.value}%`, x, y);

    startAngle += sliceAngle;
  });
}

drawEconomyChart();
