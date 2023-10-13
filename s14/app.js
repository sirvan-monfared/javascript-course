const data = fetch("https://niazmandiha.kodesign.ir/api/")
    .then(function(result) {
        console.log(1);
        return result.jsondfg43gvry54();
    })
    .then((result) => {
        console.log(2);
        console.log(result);
    })
    .catch(() => {
        alert('There was an error during the process. please try again later');
    })
    

console.log(data);


// PENDING ------------ SETTLED

// fulfilled
// rejected