document.addEventListener('DOMContentLoaded', function() {
	loadOptions();
    console.log("panel opened")
	var reloginChecker = document.getElementById('relogin');
    reloginChecker.addEventListener('change', function() {
		relogin();
    }, false);
	var reloadChecker = document.getElementById('reload');
    reloadChecker.addEventListener('change', function() {
        reload();
    },false);
	var ognpChecker = document.getElementById('ognp');
    ognpChecker.addEventListener('change', function() {
		ognp();
    }, false);
    var tgIDChecker = document.getElementById('tg_btn');
    tgIDChecker.addEventListener('click', function() {
        tgID(document.getElementById("tgID").value);
    }, false);
    var tgTestChecker = document.getElementById('test_btn');
    tgTestChecker.addEventListener('click', function() {
        tgURL = 'https://api.telegram.org/bot' + '1332257997:AAG2loW8TZJ37mjfyuqK57XFbnwaNGcaJAY' + '/sendMessage';
        chrome.storage.sync.get(['tgID'], function(items) {
            alert(items['tgID'])
            $.get(tgURL + '?chat_id=' + items['tgID'] +'&text= Тестовое сообщение', function(){console.log("Test message sent")})
        })
    }, false);
}, false);

function relogin() {
    select = document.getElementById("relogin");
    chrome.storage.sync.set({"relogin": select.checked}, function() {
//        alert("Relogin set to " + select.checked);
    })
}
function reload() {
    select = document.getElementById("reload");
    chrome.storage.sync.set({"reload": select.checked}, function() {
//        alert("Reload set to " + select.checked);
    })
}
function ognp() {
    select = document.getElementById("ognp");
    chrome.storage.sync.set({"ognp": select.checked}, function() {
//        alert("OGNP set to " + select.checked);
    })
}
function tgID (id) {
    chrome.storage.sync.set({["tgID"]:id}, function() {
        alert("Tg ID set to " + id);
    })
}

function loadOptions() {
	chrome.storage.sync.get(['tgID','relogin','reload','ognp'], function(items) {
		var choice=items['tgID'];
		if(choice == undefined) choice = 000000000;
		var select = document.getElementById("tgID");
        select.placeholder = choice;

		choice=items['relogin'];
		if(choice == undefined) choice = false;
		var select = document.getElementById("relogin");
		select.checked = choice;

		choice=items['reload'];
		if(choice == undefined) choice = false;
		var select = document.getElementById("reload");
		select.checked = choice;

		choice=items['ognp'];
		if(choice == undefined) choice = false;
		var select = document.getElementById("ognp");
		select.checked = choice;
    });
}
