import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import Chart from 'react-apexcharts'
import './Home.css'

const Home = ({ search }) => {
  const [metrics, setMetrics] = useState([])
  const [filteredMetrics, setFilteredMetrics] = useState([])

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      const response = await axiosInstance.get('/metrics/usermetrics')
      setMetrics(response.data.data)
    } catch (error) {
      console.error('Error fetching metrics:', error)
    }
  }

  useEffect(() => {
    setFilteredMetrics(
      metrics.filter((metric) =>
        Object.values(metric).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
    )
  }, [search, metrics])

  const chartData = {
    options: {
      chart: {
        id: 'metrics-chart',
        toolbar: { show: false },
      },
      xaxis: {
        categories: filteredMetrics.map((m) => m.date),
      },
      colors: ['#007bff', '#28a745'],
      stroke: { curve: 'smooth' },
      markers: { size: 4 },
    },
    series: [
      {
        name: 'Steps',
        data: filteredMetrics.map((m) => m.steps),
      },
      {
        name: 'Distance (km)',
        data: filteredMetrics.map((m) => m.distance),
      },
    ],
  }

  return (
    <div className='container'>
      <div className='chart-container'>
        <div className='chart'>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type='line'
            height={200}
          />
        </div>
      </div>

      <table className='metrics-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>Distance (km)</th>
            <th>Active Minutes</th>
          </tr>
        </thead>
        <tbody>
          {filteredMetrics.length > 0 ? (
            filteredMetrics.map((metric) => (
              <tr key={metric.id}>
                <td>{metric.date}</td>
                <td>{metric.steps}</td>
                <td>{metric.distance}</td>
                <td>{metric.active_minutes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan='4'
                className='no-metrics'
              >
                No metrics found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Home
