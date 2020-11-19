let url ="http://numbersapi.com";
axios.get(`${url}/18,42?json`)
  .then(res => {
    console.log("FIRST PROMISE RESOLVED!")
    for (el in res.data) {
      let node  = document.createElement("LI");
      let textnode = document.createTextNode(res.data[el]);
      node.appendChild(textnode); 
      document.getElementById("multi-num-list").appendChild(node)
      console.log(res.data[el]) 
    }
    console.log(res.data)
  })
  .catch(err => console.log("REJECTED!!", err))


// Four requests
let fourPromises = [];

for (let i = 1; i < 5; i++) {
  fourPromises.push(
    axios.get(`${url}/18?json`)
  );
}

Promise.all(fourPromises)
.then(arr => {
  for (res of arr) {
    let node  = document.createElement("LI");
    let textnode = document.createTextNode(res.data.text);
    node.appendChild(textnode); 
    document.getElementById("four-facts-list").appendChild(node)
    console.log(res.data.text)
  }
})
.catch(err => console.log(err))




