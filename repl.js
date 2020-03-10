const WebSocket = require('ws');
defAmount='10';
amount=defAmount;
var lastLastBalance,lastBalance,balance;
var socket = new WebSocket('wss://btc.data.hxro.io/live');
apiToken = 'eae5819bd5e14803a1abff8141c36ee6';
//seriesId = 'd241c174-112a-472e-8d20-105a2e43c537';
//hxro
seriesId='e3397acf-42fd-4d12-b825-919566681c7f';

var prc,
	less = 0,
	more = 0,
	lastPrc;
var last,
	secnIntr = false;
firstInt = false;
wd = wdl = 0;
volatile=false;
lastContest=0;

entry="";

re = /(.+)price(.+?)(.+?)/;
reend = /,(.+)/;

socket.onmessage = function(event) {
	var message = event.data;

	prc = parseFloat(message.replace(re, '').replace(reend, ''));

	if (prc > lastPrc) {
		more++;
		wd += 2;
		if (wd > 330) {
			wdl -= 2;
			wd -= 2;
		}
	}
	if (prc < lastPrc) {
		less++;
		wdl += 2;
		if (wdl > 330) {
			wdl -= 2;
			wd -= 2;
		}
	}

	lastPrc = prc;

  if((more+less)>200)volatile=true;
  if((more+less)<200)volatile=false;
  
  lastContest=prc-lastMinutePrc;
  
	console.clear();
	console.log(prc + ' ' + getTime() +' '+more+' '+less+'\n'+ trendFactor +' ' +trend+' '+volatile.toString()+' \nLastPrc '+lastMinutePrc+' \nLastLast '+lastLastContest+' \nLast '+lastContest+' \nBalance '+balance+'\n'+lastBalance+'\n'+lastLastBalance);
};

var wdrate, wdlast, wdlrate, wdllast;
var highers = 0,
	lowers = 0;
var trendFactor, trend;
setInterval(function() {
	wdrate = parseInt(wd - wdlast);
	//cons.innerHTML=wdrate
	wdlast = wd;
}, 1000);

setInterval(function() {
	wdlrate = parseInt(wdl - wdllast);

	if (parseInt(wdrate) >= parseInt(wdlrate)) {
		highers += 2;
	}
	if (wdrate <= wdlrate) {
		lowers += 2;
	}

	trendFactor = (highers / lowers) / (more / less);
	if (trendFactor < 1) trend = 'Down';
	if (trendFactor > 1) trend = 'Up';
	
	
	

	wdllast = wdl;
}, 1000);


nextContest='';
lastMinutePrc=prc;
lastLastPrc=prc;
lastLastContest=prc;

setInterval(function() {
  
  if(seconds=='57'){
    lastLastPrc=lastMinutePrc;
    
    lastLastContest=lastContest;
  }
  if(seconds=='0'){
    lastMinutePrc=prc;
    lastLastContest=lastMinutePrc-lastLastPrc;
    
  }
  
  if(seconds=='40'){

var https = require('https');
var options = {
    hostname: 'beta.hxro.io',
    port: 443,
    path: '/hxroapi/api/contests/by-series/' + seriesId,
    method: 'GET',
    headers: {
        'Ocp-Apim-Subscription-Key': apiToken
    }
}

var req = https.request(options, (res) => {
    var arr = "";
    res.on('data', (part) => {
        arr += part;
    });

    res.on('end', () => {
        var seriesArr = JSON.parse(arr);
            nextContest=(seriesArr[9].id);
            //console.log(nextContest);
        
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.end();
};

if(seconds=='56'){
  
  lastContest=prc-lastMinutePrc;
  
  if(((lastContest<0)&&(lastLastContest>0))||((lastContest>0)&&(lastLastContest<0))){
  
  if(1==1){
    /*if(trend=='Up'){if(lastContest<0)entry='rekt';}
    if(trend=='Down'){if(lastContest>0)entry='moon';}*/
      entry='';
  //}else{
    if((-5<lastContest)&&(lastContest<0)){
      entry='rekt';
    }
    //if(5>lastContest>0)entry='moon';
  }
  }else{
    entry='';
  }
  
  contentJSON = {
  'contestId': nextContest,
  'contesttype': "OverUnder",
  'direction': entry,
  'wager': amount
};

var https = require('https');
var options = {
    hostname: 'beta.hxro.io',
    //port: 443,
    path: '/hxroapi/api/ContestEntry/add-contest-entry',
    method: 'POST',
    headers: {
        'Content-Type':'application/json',
        'Ocp-Apim-Subscription-Key': apiToken,
        }
};

req = https.request(options, (res) => {
    res.on('data', (d) => {
      try{
        console.log(JSON.parse(d));
      }catch(e){}
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(JSON.stringify(contentJSON));
req.end();

  contentLength = JSON.stringify({
    nickName: "AB",
    assetType: "hxro",
});
https = require('https');
options = {
    hostname: 'beta-identity.hxro.io',
    port: 443,
    path: '/api/Account',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiToken,
        'Content-Length': contentLength.length
    }
}
if((lastBalance!=null)&&(lastBalance>lastLastBalance))lastLastBalance=lastBalance;
if((balance!=null)&&(balance>lastBalance))lastBalance=balance;
req = https.request(options, (res) => {
    res.on('data', (d) => {
        try{
          balance=JSON.parse(d).balance;
          if(lastLastBalance>balance*2.5){
            amount=2*defAmount;
          }else{
            amount=defAmount;
          }
        }catch(e){}
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.write(contentLength)
req.end()
}


}, 500);

intrTime = 100;
var seconds;
test = 0;
setInterval(function() {
	//time.textContent=getTime();
	if (seconds % 5 == '0') {
		last = prc;
	}

	if (seconds == '0') {
		less = 0;
		more = 0;
		wd = 0;
		wdl = 0;
		highers = 0;
		lowers = 0;
	} else {
		if (!firstInt) {
			setTimeout(function() {
				last = prc;
				lastSec = seconds;

				firstInt = true;
			}, 4000);
		}
	}
}, intrTime);

function getTime() {
	date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	seconds = date.getSeconds();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
	return strTime;
}
