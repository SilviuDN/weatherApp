// 
export class Http{
    static fetchData(url){
        return new Promise((res, rej) => {
            const HTTP = new XMLHttpRequest();
            HTTP.open('GET', url);
            HTTP.onreadystatechange = function(){
                if( HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200){
                    const RESPONSE_DATA = JSON.parse(HTTP.responseText);
                    res(RESPONSE_DATA);
                }else if(HTTP.readyState == XMLHttpRequest.DONE){
                    rej('Something went wrong!')
                }
            }
            HTTP.send();
        })
    }
}
