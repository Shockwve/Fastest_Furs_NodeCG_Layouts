const speedcontrolBundle = 'nodecg-speedcontrol';
const targetData = nodecg.Replicant('targetData');
const pollData = nodecg.Replicant('pollData');
const rewardData = nodecg.Replicant('rewardData');
const campaignData = nodecg.Replicant('campaignData');
const charityLogo = nodecg.Replicant('assets:omnibarCharityLogo');
const marathonLogo = nodecg.Replicant('assets:omnibarMarathonLogo');
const runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
const runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const nextRuns = nodecg.Replicant('nextRuns');

let host = '';
let staticIndex, runIndex, targetIndex, pollIndex, rewardIndex;
rewardIndex = pollIndex = targetIndex = runIndex = 10;
staticIndex = 0;
let eventGoal = 'AS FAR AS WE CAN GO';

let showHost = false;
let showGoal = false;

NodeCG.waitForReplicants(targetData, pollData, rewardData, campaignData, charityLogo, marathonLogo, runDataArray, runDataActiveRun).then(() => {
	document.getElementById('charity-logo-img').setAttribute('src', charityLogo.value[0].url)
	document.getElementById('marathon-logo-img').setAttribute('src', marathonLogo.value[0].url)

	// Please view the Github docs for valid values.
	// Set static text.	
	function staticText(index) {
		if (index === 0)
			//setOmnibarHtml(`<p class="is-single-line is-text-centered">TRANS RIGHTS</p>`)
			setOmnibarHtml(`<p class="is-single-line is-text-centered">Fastest Furs Fall Fest 2021 benefiting Trans Lifeline</p>`)
		else
			setOmnibarHtml(`<p class="is-single-line is-text-centered">Donate at https://fastestfurs.com/donate</p>`)
	}

	// Host text.
	function hostText() {
		setOmnibarHtml(`<p class='is-single-line is-text-centered'>Your current host is <span style="color: #DDDDDD;">${host}</span></p>`)
	}


	// Run text.
	function runText(index) {
		const players = getNamesForRun(nextRuns.value.data[index]).join(', ');
		if (index === 0)
			
			setOmnibarHtml(`<p class='is-single-line is-text-centered'>UP NEXT: ${nextRuns.value.data[index].game} - ${nextRuns.value.data[index].category} by ${players}</p>`)
		else
			setOmnibarHtml(`<p class="is-single-line is-text-centered">COMING LATER: ${nextRuns.value.data[index].game} - ${nextRuns.value.data[index].category} by ${players}</p>`)
	}

	// Targets text.
	function targetText(index) {
		if (index === 0)
			setOmnibarHtml(`<p class="is-multiline is-text-centered">NEXT INCENTIVE: ${targetData.value.data[index].name}</p> <p class="is-multiline is-text-centered">$${targetData.value.data[index].currentAmount} / $${targetData.value.data[index].targetAmount}</p>`)
		else
			setOmnibarHtml(`<p class="is-multiline is-text-centered">LATER INCENTIVE: ${targetData.value.data[index].name}</p> <p class="is-multiline is-text-centered">$${targetData.value.data[index].currentAmount} / $${targetData.value.data[index].targetAmount}</p>`)
	}

	// Polls text.
	function pollText(index) {

		// 1 option.
		if (pollData.value.data[index].options.length === 1)
			setOmnibarHtml(`<p class="is-multiline is-text-centered">NEXT BIDWAR: ${pollData.value.data[index].name}</p> <p class="is-multiline is-text-centered">${pollData.value.data[index].options[0].name}: $${pollData.value.data[index].options[0].currentAmount}</p>`)

		// 2 options.
		else if (pollData.value.data[index].options.length === 2)
			setOmnibarHtml(`<p class="is-multiline is-text-centered">NEXT BIDWAR: ${pollData.value.data[index].name}</p> <p class="is-multiline is-text-centered">${pollData.value.data[index].options[0].name}: $${pollData.value.data[index].options[0].currentAmount} vs. ${pollData.value.data[index].options[1].name}: $${pollData.value.data[index].options[1].currentAmount}</p>`)

		// 3 or more options.
		else if (pollData.value.data[index].options.length >= 3)
			setOmnibarHtml(`<p class="is-multiline is-text-centered">NEXT BIDWAR: ${pollData.value.data[index].name}</p> <p class="is-multiline is-text-centered">${pollData.value.data[index].options[0].name}: $${pollData.value.data[index].options[0].currentAmount} vs. ${pollData.value.data[index].options[1].name}: $${pollData.value.data[index].options[1].currentAmount} vs. ${pollData.value.data[index].options[2].name}: $${pollData.value.data[index].options[2].currentAmount}</p>`)
	}

	// Rewards text.
	function rewardText(index) {
		if (index === 0)
			setOmnibarHtml(`<p class="is-multiline is-text-centered">LATEST PRIZE: ${rewardData.value.data[index].name}</p> <p class="is-multiline is-text-centered">Min. Donation: $${rewardData.value.data[index].minDonation}</p>`)
		else
			setOmnibarHtml(`<p class="is-multiline is-text-centered">LATEST PRIZE: ${rewardData.value.data[index].name}</p> <p class="is-multiline is-text-centered">Min. Donation: $${rewardData.value.data[index].minDonation}</p>`)
	}

	// Goals text.
	function goalText() {
		setOmnibarHtml(`<p class="is-single-line is-text-centered">EVENT GOAL: ` + eventGoal + `</p>`)
	}

	// Do not edit below this line (unless you know what you're doing!)
	runDataActiveRun.on('change', (newVal, oldVal) => {
		let runs = [];
		let currentRunIndex = runDataArray.value.findIndex(runData => runData.id === newVal.id);
		for (let i = 1; i <= nodecg.bundleConfig.omnibar.numRuns; i++) {
			if (!runDataArray.value[currentRunIndex + i]) {
				break;
			}
			runs.push(runDataArray.value[currentRunIndex + i]);
		}
		nextRuns.value = { dataLength: runs.length, data: runs };

		if (nodecg.bundleConfig.omnibar.showHost && newVal.customData.host !== undefined)
			host = newVal.customData.host;
		else
			host = '';
	});
	
	setOmnibarHtml(staticText[0])
	runTickerText();

	function setOmnibarHtml(html) {
		$('#omnibar-content').fadeOut(nodecg.bundleConfig.omnibar.fadeOutTime, () => {
			$('#omnibar-content').html(html).fadeIn(nodecg.bundleConfig.omnibar.fadeInTime);
		});
	}

	function runTickerText() {
		setInterval(() => {
			if (showHost && nodecg.bundleConfig.omnibar.showHost && host !== '') {
				hostText();
				showHost = false;
			}
			else if (runIndex < nextRuns.value.dataLength && runIndex < nodecg.bundleConfig.omnibar.numRuns) {
				runText(runIndex);
				runIndex++;
			}
			else if (targetIndex < targetData.value.dataLength && targetIndex < nodecg.bundleConfig.omnibar.numTargets) {
				targetText(targetIndex);
				targetIndex++;
			}
			else if (pollIndex < pollData.value.dataLength && pollIndex < nodecg.bundleConfig.omnibar.numPolls) {
				pollText(pollIndex);
				pollIndex++;
			}
			else if (rewardIndex < rewardData.value.dataLength && rewardIndex < nodecg.bundleConfig.omnibar.numRewards) {
				rewardText(rewardIndex)
				rewardIndex++;
			}
			else if (showGoal && nodecg.bundleConfig.omnibar.showGoal) {
				goalText()
				showGoal = false;
			}
			else {
				staticText(staticIndex)
				staticIndex++;

				if (staticIndex > staticText.length) {
					rewardIndex = pollIndex = targetIndex = runIndex = staticIndex = 0;
					showHost = true;
					showGoal = true;
				}
			}
		}, nodecg.bundleConfig.omnibar.dwellTime);
	}
});

$(document).ready(function() {

	$.ajax({
        	url: "http://stream.fastestfurs.com:3000/donate/total",
        	type: "GET",
        	dataType: 'json',
        	success: function(data, status){
        		res = data;
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