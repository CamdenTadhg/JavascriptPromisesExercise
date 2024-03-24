let url = 'http://numbersapi.com/48/trivia?json';
axios.get(url)
    .then(res => {
        console.log(res);
    });

let url2 = 'http://numbersapi.com/1..4/trivia?json';
axios.get(url2)
    .then( res => {
        console.log(res);
})

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
    .catch(err => console.log(error));