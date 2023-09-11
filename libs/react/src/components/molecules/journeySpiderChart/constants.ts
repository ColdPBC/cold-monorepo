import { HexColors } from "@coldpbc/themes";
import { ChartData, ChartOptions } from "chart.js";

export const defaultChartData: ChartData = {
    datasets: [{
        data: [],
    }],
};

export const emptyChartData: ChartData = {
    datasets: [{
        data: [
            50,
            80,
            68,
            74,
            25,
            60,
            80,
            50
        ],
    }],
    labels: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]
};

export const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 800,
        easing: 'easeOutQuint',
    },
    elements: {
        point: {
            radius: 3,
            borderColor: HexColors.white,
            backgroundColor: HexColors.primary.DEFAULT, // this gets overwritten later
        },
        line: {
            borderWidth: 1,
        }
    },
    scales: {
        r: {
            animate: true,
            max: 100, // TODO - normalize this to whatever the value bounds are once we know them
            min: 0,
            ticks: {
                display: false,
                count: 4,
            },
            pointLabels: {
                color: HexColors.tc.primary,
                font: {
                    family:"'Inter', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
                    size: 12,
                    weight: '500',
                },
                padding: 8,
            },
            grid: {
                color: HexColors.bgc.accent,
            },
            angleLines: {
                color: HexColors.bgc.accent,
            },
        }
    },
    plugins: {
        legend: {
            display:false,
        },
    },
};