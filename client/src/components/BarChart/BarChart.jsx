import {Bar} from "react-chartjs-2";
// eslint-disable-next-line
import {Chart as ChartJS} from "chart.js/auto";

/**
 * Componente de 1 grafico de barras
 */
const BarChart = ({chartData}) => {
  return (
    <Bar data={chartData}/>
  )
}

export default BarChart