var Utils = function() {}

Utils.prototype.shuffle = function(a) {
    for (let i=a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i-1], a[j]] = [a[j], a[i-1]];
    }
}

Utils.prototype.load = function() {
    var xhr = cc.loader.getXMLHttpRequest();
    
    xhr.open('POST', 'http://google.com');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
       if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <=207 ) ) {
           var httpStatus = xhr.statusText;
           cc.log(httpStatus);
           
           if (xhr.responseText) {
               cc.log(xhr.responseText);
           }
       }
    };
}

module.exports = new Utils();