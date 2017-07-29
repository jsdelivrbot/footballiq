var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
    	 labels: ["Involvement", "Productivity", "Losses","Efficiency"],
    	
        datasets: [
                   {
                       label: "Attack",
                       backgroundColor: 'rgba(255, 51, 51,0.3)',
                       borderColor:'rgba(255, 51, 51,0.8)',
                       hoverBorderWidth:[3,3,3,3],
                       borderWidth:[1,1,1,1],
                       data: [14,15,12,10]
                   },
                   {
                       label: "Passing",
                       backgroundColor: 'rgba(179, 60, 0,0.3)',
                       borderColor:'rgba(255, 51, 51,0.8)',
                       hoverBorderWidth:[3,3,3,3],
                       borderWidth:[1,1,1,1],
                       data: [11,18,17,9]
                   },
                   {
                       label: "Duels",
                       backgroundColor: 'rgba(0, 0, 179,0.3)',
                       borderColor:'rgba(255, 51, 51,0.8)',
                       hoverBorderWidth:[3,3,3,3],
                       borderWidth:[1,1,1,1],
                       data: [15,8,14,17]
                   },
                   {
                       label: "Aerial",
                       backgroundColor: 'rgba(0, 179, 60,0.3)', 
                       borderColor:'rgba(255, 51, 51,0.8)',
                       hoverBorderWidth:[3,3,3,3],
                       borderWidth:[1,1,1,1],
                       data: [4,8,16,15]
                   },
                   {
                       label: "Defence",
                       backgroundColor: 'rgba(204, 0, 204,0.3)', 
                       borderColor:'rgba(255, 51, 51,0.8)',
                       hoverBorderWidth:[3,3,3,3],
                       borderWidth:[1,1,1,1],
                       data: [18,15,16,17]
                   },
                   {
                       label: "Set Pieces",
                       backgroundColor: 'rgba(230, 230, 0,0.3)', 
                       borderColor:'rgba(255, 51, 51,0.8)',
                       hoverBorderWidth:[3,3,3,3],
                       borderWidth:[1,1,1,1],
                       data: [12,10,11,5]
                   }
               
        ],
        borderWidth: 1
    },
    options: {
    	barPercentage:0.5,
    	categoryPercentage:0.5,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});