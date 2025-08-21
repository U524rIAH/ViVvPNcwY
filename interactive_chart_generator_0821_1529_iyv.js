// 代码生成时间: 2025-08-21 15:29:39
 * Interactive Chart Generator using Next.js
 *
 * This application allows users to generate interactive charts
 * based on user input data.
 */

const express = require('express');
const { Chart } = require('chart.js');
const { createChart } = require('./chart_creator');

// Initialize Next.js server
const app = express();

// Handle GET requests to generate charts
app.get('/generate-chart', async (req, res) => {
    try {
        // Retrieve data from request query
        const { data } = req.query;
        
        // Validate data
        if (!data) {
            return res.status(400).json({ error: 'No data provided' });
        }

        // Convert data from string to JSON
        const chartData = JSON.parse(data);

        // Create chart using the chart creator module
        const chart = await createChart(chartData);

        // Return chart as image
        res.setHeader('Content-Type', 'image/png');
        res.send(chart.toBase64Image());
    } catch (error) {
        // Handle any errors that occur during chart generation
        console.error('Error generating chart:', error);
        res.status(500).json({ error: 'Failed to generate chart' });
    }
});

// Start server on port 3000
app.listen(3000, () => console.log('Server started on port 3000'));

/*
 * Chart Creator Module
 *
 * This module is responsible for creating charts based on provided data.
 */

// Function to create a chart using Chart.js
async function createChart(chartData) {
    // Initialize a new Chart instance
    const chart = new Chart('canvas', {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Interactive Chart',
                },
            },
        },
    });

    // Return the chart instance
    return chart;
}

/*
 * Export the createChart function for testing
 */

module.exports = { createChart };
