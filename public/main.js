const form = document.getElementById('vote-form');

//Form Submit
form.addEventListener('submit', e=>{
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};
    fetch('http://localhost:3000/poll',{
        method:'post', 
        body: JSON.stringify(data), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch( err => console.log(err));
    e.preventDefault();
})

let dataPoints = [
    {label:'Windows', y: 0},
    {label:'MacOS', y: 0},
    {label:'Linux', y: 0},
    {label:'Other', y: 0},
]

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS Results'
        },

        data:[
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher('d3db72848e63ceb1b00d', {
        cluster: 'ap1',
        forceTLS: true
      });
  
      var channel = pusher.subscribe('os-poll');
      channel.bind('os-vote', function(data) {
        dataPoints = dataPoints.map( point => {
            if(point.label == data.os){
                point.y += data.points;
                return point;
            } else {
                return point
            }
        });
        chart.render();
      });
}