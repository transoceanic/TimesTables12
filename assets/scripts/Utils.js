var Utils = function() {}

Utils.prototype.shuffle = function(a) {
    for (let i=a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i-1], a[j]] = [a[j], a[i-1]];
    }
}

Utils.prototype.loadJson = function(options) {
    var xhr = cc.loader.getXMLHttpRequest();
    
    // xhr.open('GET', 'https://multiplication-table-server.herokuapp.com/multiplication-table/api/achievements');
    xhr.open(options.method, options.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        console.log('----onreadystatechange xhr.status '+xhr.status);
        if ( xhr.readyState == 4 ) {
            if ( xhr.status >= 200 && xhr.status <=207 ) {
                var result = {};
                if (xhr.response && typeof(xhr.response) === 'string') {
                    try {
                        result = JSON.parse(xhr.response);
                    } catch (e) {}
                } else if (xhr.response && typeof(xhr.response) === 'object') {
                    result = xhr.response;
                }
                (options.success || function(){})(result);
            } else {
                (options.error || function(){})();
            }
        }
    };
    
    if (options.data && typeof(options.data) === 'object') {
        options.data.token = ((new Date().getTime())*1474).toString(16);
        xhr.send(JSON.stringify(options.data));
    } else {
        xhr.send();
    }
}

module.exports = new Utils();