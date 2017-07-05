var Utils = function() {}

Utils.prototype.shuffle = function(a) {
    for (let i=a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i-1], a[j]] = [a[j], a[i-1]];
    }
}

Utils.prototype.load = function() {
    var param = {name: 'Feldman', score: 1300};
    
    var xhr = cc.loader.getXMLHttpRequest();
    
    // xhr.open('GET', 'https://multiplication-table-server.herokuapp.com/multiplication-table/api/achievements');
    xhr.open('POST', 'https://multiplication-table-server.herokuapp.com/multiplication-table/api/save', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        console.log('----onreadystatechange xhr.readyState '+xhr.readyState);
        console.log('----onreadystatechange xhr.status '+xhr.status);
       if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <=207 ) ) {
           var httpStatus = xhr.statusText;
           cc.log(httpStatus);
        console.log('----httpStatus '+httpStatus);
           
              console.log('----xhr.response '+xhr.response);
           if (xhr.responseText) {
               cc.log(xhr.responseText);
            //   for (let prop in xhr)
            //         console.log('----xhr '+prop +'='+xhr[prop]+' ('+typeof(xhr[prop])+')');
           }
       }
    };
    
    xhr.send('{"name":"Feldman","score":1300}');
}

module.exports = new Utils();