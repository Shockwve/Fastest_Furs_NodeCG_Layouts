let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(loadFromSpeedControl);

function getNextRuns(runData, amount) {
	let nextRuns = [];
	let indexOfCurrentRun = findIndexInRunDataArray(runData);
	for (let i = 1; i <= amount; i++) {
		if (!runDataArray.value[indexOfCurrentRun + i]) {
			break;
		}
		nextRuns.push(runDataArray.value[indexOfCurrentRun + i]);
	}
	return nextRuns;
}

function findIndexInRunDataArray(run) {
	let indexOfRun = -1;
	if (run) {
		for (let i = 0; i < runDataArray.value.length; i++) {
			if (run.id === runDataArray.value[i].id) {
				indexOfRun = i; break;
			}
		}
	}
	return indexOfRun;
}

function loadFromSpeedControl() {
	runDataActiveRun.on('change', (newVal, oldVal) => {
		refreshNextRunsData(newVal);
	});

	runDataArray.on('change', (newVal, oldVal) => {
		refreshNextRunsData(runDataActiveRun.value);
	});

}

function refreshNextRunsData(currentRun) {
	let nextRuns = getNextRuns(currentRun, 2);

	let upNextGame = '#up-next-game';
	let upNextInfo = '#up-next-info';
	let upNextEstimate = '#up-next-estimate';
	fadeHtml(upNextGame, currentRun.game, true);
	fadeHtml(upNextInfo, getNamesForRun(runDataActiveRun.value).join(', '), true);
	fadeHtml(upNextEstimate, currentRun.estimate, true);
	if (currentRun.region !== undefined)
		fadeHtml('#host', "Host: " + currentRun.region);
	else
		fadeHtml('#host', '');

	let i = 0;
	for (let run of nextRuns) {
		if (i >= 2) {
			break;
		}
		let onDeckGame = '#on-deck-game' + (i + 1);
		let onDeckRunner = '#on-deck-info' + (i + 1);
		let onDeckEstimate = '#on-deck-estimate' + (i + 1);
		fadeHtml(onDeckGame, run.game, true);
		fadeHtml(onDeckRunner, getNamesForRun(run).join(', '), true);
		fadeHtml(onDeckEstimate, run.estimate, true);
		i += 1;
	}
}

$(document).ready(function() {

	$.ajax({
        	url: "http://stream.fastestfurs.com:3000/donate/total",
        	type: "GET",
        	dataType: 'json',
        	success: function(data, status){
        		res = data;
        		console.log("got data " + res.total);
       			$("#donation-total-ff").text("$" + res.total);
       			document.getElementById("donation-total")
        	},
        	error: function(data, status, error){
        		
        		console.log("FUUUUUUUCK " + status);
        		console.log("SHIIIIIIT  " + error);
        	} 
    	});

	setInterval(function(){
    	$.ajax({
        	url: "http://stream.fastestfurs.com:3000/donate/total",
        	type: "GET",
        	dataType: 'json',
        	success: function(data, status){
        		res = data;
        		console.log("got data " + res.total);
       			$("#donation-total-ff").text("$" + res.total);
       			document.getElementById("donation-total")
        	},
        	error: function(data, status, error){
        		
        		console.log("FUUUUUUUCK " + status);
        		console.log("SHIIIIIIT  " + error);
        	} 
    	});
    }, 5000);
});
