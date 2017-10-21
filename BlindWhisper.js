on("chat:message", function(msg) {
    var cmdName = "!bw";
    var msgWhisper = msg.content.slice(cmdName.length);

    if(msg.type == "api" && msg.content.indexOf(cmdName) !== -1) {
        if(_.has(msg,'inlinerolls')){
            msgWhisper = _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    m['$[['+k+']]']=v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,v);
                },msgWhisper)
                .value();
        }      
        if(_.has(msg,'rolltemplate')) {
            sendChat('','/w gm &{template:'+msg.rolltemplate+'}'+msgWhisper);
        } else {
            sendChat('', '/w gm '+msgWhisper.replace(/\&/g,'&') );
        }
    }
});