function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//      console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  //var month = months[a.getMonth()];
  var month = a.getMonth()+1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


var heightRef = 200; // cm

var urlParams = new URLSearchParams(window.location.search);

var limit = 3000;

var param_limit = urlParams.get('limit');

if (param_limit !== null) {
limit = parseInt(param_limit);
}


var base_url = 'http://64.227.0.108:9000/latest'
var fetch_url = base_url;



	 //fetch('http://localhost:8000/api/users/')
//fetch('http://64.227.0.108:8100/api/user/latest')
fetch(fetch_url)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
var xvals = [];	  
var timestamp = [];
var h_d_a = [];
var h_d_b = [];
	
// get the data
for (i in data) {
  //xvals.push(i);
  //xvals.push(data[i].id);
//  xvals.push(data[i].id);
  xvals.push(timeConverter(data[i].id));
  h_d_a.push(data[i].h_d_a);
}

// flip b/c of way we got the data form sql:
xvals=xvals.reverse();
h_d_a=h_d_a.reverse();

var h_d_a_points = [];
for (var i=0; i<xvals.length; i++) {

	h_d_a_points[i]= {t:xvals[i],y:h_d_a[i]};
}


var ctx_humidity = document.getElementById('distanceChart').getContext('2d');
var humidityChart = new Chart(ctx_humidity, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
	    borderColor: "green",
            pointRadius: 1,
   backgroundColor: "green",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "green",
   pointBorderColor: "green",
   pointHoverBackgroundColor: "green",
   pointHoverBorderColor: "green",
      label: 'RH (%)',
	    fill: false,
      data: h_d_a_points
      borderWidth: 1
    }
    ]
  },
  options: {
	  legend: {
            display: true,
		  //position: 'right',
        },
	  title: {
            display: true,
            text: 'Maxbotix Ultrasonic Rangefinder'
        },
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	time: {
		//format: "HH:MM:SS",
		//unit: 'day',
		//minUnit: 'hour',
	}
      }],
	    yAxes: [{
                ticks: {
                    suggestedMin: 20,
                    suggestedMax: 200 
                }
            }]
    }
  }
});


});



