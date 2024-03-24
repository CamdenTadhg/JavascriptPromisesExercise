//Make a request to the NumbersAPI to get a fact about your favorite number
let url = 'http://numbersapi.com/48/trivia?json';
axios.get(url)
    .then(res => {
        console.log(res);
    });

// Figure out how to get data on multiple numbers in a singular request. Make that request and when you get data back, put all the number facts on the page. 
let url2 = 'http://numbersapi.com/1..4/trivia?json';
axios.get(url2)
    .then(res => {
        for (const key in res.data){
            $paragraph = $(`<p>${res.data[key]}</p>`);
            $('#results-div').append($paragraph);
        }
    })
    .catch(err => console.log(err));

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
    let url3 = 'http://numbersapi.com/36/trivia?jason'
let fourNumberTrivia = [];
for (let i = 1; i < 5; i++){
    fourNumberTrivia.push(
        axios.get(url3)
    )
}
Promise.all(fourNumberTrivia)
    .then(NumberArr => (
        NumberArr.forEach(n => {
            console.log('for each statement');
            console.log(n);
            $paragraph = $(`<p>${n.data}</p>`);
            $('#results-div').append($paragraph);
        })
    ))
    .catch(err => console.log(err));


