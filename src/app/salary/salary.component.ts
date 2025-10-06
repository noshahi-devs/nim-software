import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
declare var $: any;
import {
  NgApexchartsModule,
  ChartComponent
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [NgApexchartsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent {
  title = 'Home 7';

  enrollmentChart;
  areaChart;
  dailyIconBarChart;
  constructor() {
    this.enrollmentChart = this.createChartTwo('#487FFF', "");
    this.areaChart =   this.createChart( '#FF9F29');
    this.dailyIconBarChart = {
      series: [{
          name: "Sales",
          data: [{
              x: 'Mon',
              y: 20,
          }, {
              x: 'Tue',
              y: 40,
          }, {
              x: 'Wed',
              y: 20,
          }, {
              x: 'Thur',
              y: 30,
          }, {
              x: 'Fri',
              y: 40,
          }, {
              x: 'Sat',
              y: 35,
          }]
      }],
      chart: {
          type: 'bar',
          width: 164,
          height: 80,
          sparkline: {
            enabled: true // Remove whitespace
          },
          toolbar: {
              show: false
          }
      },
      plotOptions: {
          bar: {
              borderRadius: 6,
              horizontal: false,
              columnWidth: 14,
          }
      },
      dataLabels: {
          enabled: false
      },
    states: {
        hover: {
        filter: {
            type: 'none'
            }
        }
    },
      fill: {
          type: 'gradient',
          colors: ['#E3E6E9'], // Set the starting color (top color) here
          gradient: {
              shade: 'light', // Gradient shading type
              type: 'vertical',  // Gradient direction (vertical)
              shadeIntensity: 0.5, // Intensity of the gradient shading
              gradientToColors: ['#E3E6E9'], // Bottom gradient color (with transparency)
              inverseColors: false, // Do not invert colors
              opacityFrom: 1, // Starting opacity
              opacityTo: 1,  // Ending opacity
              stops: [0, 100],
          },
      },
      grid: {
          show: false,
          borderColor: '#D1D5DB',
          strokeDashArray: 1, // Use a number for dashed style
          position: 'back',
      },
      xaxis: {
            labels: {
                show: false // Hide y-axis labels
            },
            type: 'category',
            categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
      },
      yaxis: {
          labels: {
            show: false,
              formatter: function (value) {
                  return (value / 1000).toFixed(0) + 'k';
              }
          }
      },
      tooltip: {
          y: {
              formatter: function (value) {
                  return value / 1000 + 'k';
              }
          }
      }
    };

  }

  createChartTwo(color1, color2) {
    return {
      series: [{
        name: 'series2',
        data: [20000, 45000, 30000, 50000, 32000, 40000, 30000, 42000, 28000, 34000, 38000, 26000]
      }],
      legend: {
        show: false
      },
      chart: {
        type: 'area',
        width: '100%',
        height: 240,
        toolbar: {
          show: false
        },
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 3,
        colors: [color1], // Use two colors for the lines
        lineCap: 'round'
      },
      grid: {
        show: true,
        borderColor: '#D1D5DB',
        strokeDashArray: 1,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        row: {
          colors: undefined,
          opacity: 0.5
        },
        column: {
          colors: undefined,
          opacity: 0.5
        },
        padding: {
          top: -20,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      fill: {
        type: 'gradient',
        colors: [color1], // Use two colors for the gradient
        // gradient: {
        //     shade: 'light',
        //     type: 'vertical',
        //     shadeIntensity: 0.5,
        //     gradientToColors: [`${color1}`, `${color2}00`], // Bottom gradient colors with transparency
        //     inverseColors: false,
        //     opacityFrom: .6,
        //     opacityTo: 0.3,
        //     stops: [0, 100],
        // },
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: [undefined, `${color2}00`], // Apply transparency to both colors
          inverseColors: false,
          opacityFrom: [0.4, 0.4], // Starting opacity for both colors
          opacityTo: [0.1, 0.1], // Ending opacity for both colors
          stops: [0, 100],
        },
      },
      markers: {
        colors: [color1], // Use two colors for the markers
        strokeWidth: 3,
        size: 0,
        hover: {
          size: 10
        }
      },
      xaxis: {
        
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tooltip: {
          enabled: false
        },
        labels: {
          formatter: function (value) {
            return value;
          },
          style: {
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        labels: {
          // formatter: function (value) {
          //     return "$" + value + "k";
          // },
          style: {
            fontSize: "12px"
          }
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
  }

   createChart( chartColor) {

    let currentYear = new Date().getFullYear();

    return {
        series: [
            {
                name: 'series1',
                data: [0, 10, 8, 25, 15, 26, 13, 35, 15, 39, 16, 46, 42],
            },
        ],
        chart: {
            type: 'area',
            width: 164,
            height: 72,

            sparkline: {
                enabled: true // Remove whitespace
            },

            toolbar: {
                show: false
            },
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            colors: [chartColor],
            lineCap: 'round'
        },
        grid: {
            show: true,
            borderColor: 'transparent',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: false
                }
            },  
            row: {
                colors: undefined,
                opacity: 0.5
            },  
            column: {
                colors: undefined,
                opacity: 0.5
            },  
            padding: {
                top: -3,
                right: 0,
                bottom: 0,
                left: 0
            },  
        },
        fill: {
            type: 'gradient',
            colors: [chartColor], // Set the starting color (top color) here
            gradient: {
                shade: 'light', // Gradient shading type
                type: 'vertical',  // Gradient direction (vertical)
                shadeIntensity: 0.5, // Intensity of the gradient shading
                gradientToColors: [`${chartColor}00`], // Bottom gradient color (with transparency)
                inverseColors: false, // Do not invert colors
                opacityFrom: .8, // Starting opacity
                opacityTo: 0.3,  // Ending opacity
                stops: [0, 100],
            },
        },
        // Customize the circle marker color on hover
        markers: {
            colors: [chartColor],
            strokeWidth: 2,
            size: 0,
            hover: {
            size: 8
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: [`Jan ${currentYear}`, `Feb ${currentYear}`, `Mar ${currentYear}`, `Apr ${currentYear}`, `May ${currentYear}`, `Jun ${currentYear}`, `Jul ${currentYear}`, `Aug ${currentYear}`, `Sep ${currentYear}`, `Oct ${currentYear}`, `Nov ${currentYear}`, `Dec ${currentYear}`],
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };
    }


}
