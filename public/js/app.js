console.log('client app connected');

const backendMessage = document.getElementById('backend-test');

fetch('/api/game')
    .then(res => res.json())
    .then(data => backendMessage.textContent = data.msg)
    .catch( (err)=>{
        console.log("error:", err);
        backendMessage.textContent=err;
    });