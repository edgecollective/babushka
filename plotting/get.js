function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
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

var limit = 1000;

var param_limit = urlParams.get('limit');

if (param_limit !== null) {
limit = parseInt(param_limit);
}


var base_url = 'http://64.227.0.108:9000/latest?limit='
var fetch_url = base_url.concat(limit.toString())



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
var h_d_c = [];
var h_s = [];
var h_b = [];	  	

	  var t_s = [];
	  var t_b = [];
	  var t_d_a = [];
	  var t_d_b = [];
	  var t_d_c = []

	  
	  // get the data
for (i in data) {
	if (data[i].h_d_b < 1000) {
  //xvals.push(i);
  //xvals.push(data[i].id);
  xvals.push(data[i].ts);
  //xvals.push(timeConverter(data[i].id));
  h_d_a.push(data[i].h_d_a);
  h_d_b.push(data[i].h_d_b);
  h_d_c.push(data[i].h_d_c);
h_s.push(data[i].h_s);
h_b.push(data[i].h_b);
		t_s.push(data[i].t_s);
		t_b.push(data[i].t_b);
t_d_a.push(data[i].t_d_b);
t_d_b.push(data[i].t_d_b);
t_d_c.push(data[i].t_d_b);

	}
}

// flip b/c of way we got the data form sql:
xvals=xvals.reverse();
h_d_a=h_d_a.reverse();
h_d_b=h_d_b.reverse();
h_d_c=h_d_c.reverse();
h_s=h_s.reverse();
h_b=h_b.reverse();

t_b=t_b.reverse();
t_s=t_s.reverse();
t_d_a=t_d_a.reverse();
t_d_b=t_d_b.reverse();
t_d_c=t_d_c.reverse();


var h_d_a_points = [];
var h_d_b_points = [];
var h_d_c_points = [];
var h_b_points = [];
var h_s_points = [];

var t_s_points = [];
var t_b_points = [];
var t_d_a_points = [];
var t_d_b_points = [];
var t_d_c_points = [];

for (var i=0; i<xvals.length; i++) {
	h_d_a_points[i]= {t:xvals[i],y:h_d_a[i]};
	h_d_b_points[i]= {t:xvals[i],y:h_d_b[i]};
        h_d_c_points[i]= {t:xvals[i],y:h_d_c[i]};
        h_b_points[i]= {t:xvals[i],y:h_b[i]};
        h_s_points[i]= {t:xvals[i],y:h_s[i]};

    t_d_a_points[i]= {t:xvals[i],y:t_d_a[i]};
        t_d_b_points[i]= {t:xvals[i],y:t_d_b[i]};
        t_d_c_points[i]= {t:xvals[i],y:t_d_c[i]};
        t_b_points[i]= {t:xvals[i],y:t_b[i]};
        t_s_points[i]= {t:xvals[i],y:t_s[i]};


}


var ctx_humidity = document.getElementById('humidityChart').getContext('2d');
var humidityChart = new Chart(ctx_humidity, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [
	      {
            borderColor: "blue",
            pointRadius: 1,
   backgroundColor: "blue",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "blue",
   pointBorderColor: "blue",
   pointHoverBackgroundColor: "blue",
   pointHoverBorderColor: "blue",
      label: 'h_d_a',
            fill: false,
      data: h_d_a_points,
      borderWidth: 1
    },
	    {
	    borderColor: "red",
            pointRadius: 1,
   backgroundColor: "red",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "red",
   pointBorderColor: "red",
   pointHoverBackgroundColor: "red",
   pointHoverBorderColor: "red",
      label: 'h_d_b',
	    fill: false,
      data: h_d_b_points,
      borderWidth: 1
    },
    {
	    borderColor: "green",
            pointRadius: 1,
   backgroundColor: "green",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "green",
   pointBorderColor: "green",
   pointHoverBackgroundColor: "green",
   pointHoverBorderColor: "green",
      label: 'h_d_c',
	    fill: false,
      data: h_d_c_points,
      borderWidth: 1
    },
	    {
            borderColor: "pink",
            pointRadius: 1,
   backgroundColor: "pink",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "pink",
   pointBorderColor: "pink",
   pointHoverBackgroundColor: "pink",
   pointHoverBorderColor: "pink",
      label: 'h_b',
            fill: false,
      data: h_b_points,
      borderWidth: 1
    },
{
            borderColor: "lightgreen",
            pointRadius: 1,
   backgroundColor: "lightgreen",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "lightgreen",
   pointBorderColor: "lightgreen",
   pointHoverBackgroundColor: "lightgreen",
   pointHoverBorderColor: "lightgreen",
      label: 'h_s',
            fill: false,
      data: h_s_points,
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
            text: 'RH (%)'
        },
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	time: {
		//format: "HH:MM:SS",
		unit: 'hour',
		//minUnit: 'hour',
	}
      }],
	    yAxes: [{
                ticks: {
                    suggestedMin: 60,
                    suggestedMax: 80 
                }
            }]
    }
  }
});

var ctx_temp = document.getElementById('tempChart').getContext('2d');
var tempChart = new Chart(ctx_temp, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [
	      {
            borderColor: "blue",
            pointRadius: 1,
   backgroundColor: "blue",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "blue",
   pointBorderColor: "blue",
   pointHoverBackgroundColor: "blue",
   pointHoverBorderColor: "blue",
      label: 't_d_a',
            fill: false,
      data: t_d_a_points,
      borderWidth: 1
    },
	    {
	    borderColor: "red",
            pointRadius: 1,
   backgroundColor: "red",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "red",
   pointBorderColor: "red",
   pointHoverBackgroundColor: "red",
   pointHoverBorderColor: "red",
      label: 't_d_b',
	    fill: false,
      data: t_d_b_points,
      borderWidth: 1
    },
    {
	    borderColor: "green",
            pointRadius: 1,
   backgroundColor: "green",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "green",
   pointBorderColor: "green",
   pointHoverBackgroundColor: "green",
   pointHoverBorderColor: "green",
      label: 't_d_c',
	    fill: false,
      data: t_d_c_points,
      borderWidth: 1
    },
	    {
            borderColor: "pink",
            pointRadius: 1,
   backgroundColor: "pink",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "pink",
   pointBorderColor: "pink",
   pointHoverBackgroundColor: "pink",
   pointHoverBorderColor: "pink",
      label: 't_b',
            fill: false,
      data: t_b_points,
      borderWidth: 1
    },
{
            borderColor: "lightgreen",
            pointRadius: 1,
   backgroundColor: "lightgreen",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "lightgreen",
   pointBorderColor: "lightgreen",
   pointHoverBackgroundColor: "lightgreen",
   pointHoverBorderColor: "lightgreen",
      label: 't_s',
            fill: false,
      data: t_s_points,
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
            text: 'RH (%)'
        },
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	time: {
		//format: "HH:MM:SS",
		unit: 'hour',
		//minUnit: 'hour',
	}
      }],
	    yAxes: [{
                ticks: {
                    suggestedMin: 60,
                    suggestedMax: 80 
                }
            }]
    }
  }
});

});



