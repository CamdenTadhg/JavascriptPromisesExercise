//Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database
let Pokemon
axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
    .then(res => {
        Pokemon = res.data.results
        console.log(Pokemon);
        console.log(Pokemon[54].url);
    })

// Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon
let threePokemon = []
let randomNums = []
let threePokemonResults = []
for (let i = 1; i < 4; i++){
    randomNums.push(Math.floor(Math.random() * 1302));
}
for (let i = 0; i < 3; i++){
    threePokemon.push(
        axios.get(`${Pokemon[54].url}`)
            .then(res => {
                threePokemonResults.push(res.data)
            })
    )}

Promise.all(threePokemon)
    .then(res => {
        console.log(threePokemonResults);
    })
    .catch(err => console.log(err));



//Start with your code above but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon's species URL. Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.
let threePokemonb = []
let randomNumsb = []
let threePokemonResultsb = []
for (let i = 1; i < 4; i++){
    randomNumsb.push(Math.floor(Math.random() * 1302));
}
for (let i = 0; i < 3; i++){
    threePokemonb.push(
        axios.get(`${Pokemon[randomNumsb[i]].url}`)
            .then(res => {
                threePokemonResultsb.push({name: `${res.data.name}`})
                axios.get(`${res.data.species.url}`)
            })
            .then(res => {
                console.log(res);
            })
    )}

Promise.all(threePokemonb)
    .then(res => {
        console.log(threePokemonResultsb);
    })
    .catch(err => console.log(err));

//Instead of relying on console.log, let's create a UI for these random Pokemon. Build an Html page that lets you click a button to generate data from three randomly chosen pokemon. include the name of the pokemon, an image of the pokemon, and the description of its speciess which you found in the above exercise.  