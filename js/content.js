function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

$(document).ready(function (){
    var ognp = "ОГНП"
    var login = "Нет учетной записи?"
    var tgURL = 'https://api.telegram.org/bot' + '1332257997:AAG2loW8TZJ37mjfyuqK57XFbnwaNGcaJAY' + '/sendMessage';
    
    chrome.storage.sync.get(['tgID','relogin','reload','ognp'], function(items) {
            var choice=items['tgID'];
            if(choice == undefined) choice = 000000000
            tg_id = choice;

            choice=items['relogin'];
            if(choice == undefined) choice = false;
            enableLoginMessage = choice;

            choice=items['reload'];
            if(choice == undefined) choice = false;
            enablePageReloadMessage = choice;

            choice=items['ognp'];
            if(choice == undefined) choice = false;
            enableOGNPMessage = choice;
        
            console.log("Tg: ", tg_id, "\nReload: ", enablePageReloadMessage,"\nRelogin: ",enableLoginMessage,"\nOGNP:",enableOGNPMessage);
            if (window.find(ognp)) {
                if (enableOGNPMessage == true) {
                    $.get(tgURL + '?chat_id=' + tg_id +'&text= ОГНП подвезли', function(){console.log("OGNP message sent")});
                }
            } else if (window.find(login)) {
                if (enableLoginMessage == true) {
                    $.get(tgURL + '?chat_id=' + tg_id +'&text= Залогинься', function(){console.log("Login message sent")});
                }
            } else {
                setTimeout(function() {
                    console.log("reload");
                    if (enablePageReloadMessage == true) {
                        $.get(tgURL + '?chat_id=' + tg_id +'&text= Reload', function(){console.log("Reload message sent")});
                    }
                    location.reload();
                }, 10000 + getRandomInt(10000));
            }
    });
})
