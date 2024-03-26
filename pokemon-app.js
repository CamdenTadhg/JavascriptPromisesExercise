//Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database
// let Pokemon = []
// axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
//     .then(res => {
//         Pokemon = res.data.results
//     })

// Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon
// let Pokemon = []
// axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
//     .then(res => {
//         Pokemon = res.data.results
//         let threePokemon = []
//         let randomNums = []
//         let threePokemonResults = []
//         for (let i = 1; i < 4; i++){
//             randomNums.push(Math.floor(Math.random() * 1302));
//             console.log(randomNums)
//         }
//         for (let i = 0; i < 3; i++){
//             threePokemon.push(
//                 axios.get(`${Pokemon[randomNums[i]].url}`)
//                     .then(res => {
//                     threePokemonResults.push(res.data)
//                     })
//         )}
//         Promise.all(threePokemon)
//         .then(res => {
//             console.log(threePokemonResults);
//         })
//         .catch(err => console.log(err));
// })


//Start with your code above but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon's species URL. Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.
// let Pokemon = []
// axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
//     .then(res => {
//         Pokemon = res.data.results
//         let threePokemon = []
//         let randomNums = []
//         let threePokemonResults = []
//         for (let i = 1; i < 4; i++){
//             randomNums.push(Math.floor(Math.random() * 1302));
//             console.log(randomNums)
//         }
//         for (let i = 0; i < 3; i++) {
//             threePokemon.push(
//                 axios.get(`${Pokemon[randomNums[i]].url}`)
//                 .then(res => {
//                     threePokemonResults.push({name: res.data.name});
//                     return axios.get(`${res.data.species.url}`)
//                 })
//                 .then(res => {
//                     for (let j = 0; j < res.data.flavor_text_entries.length; j++){
//                         if (res.data.flavor_text_entries[j].language.name === "en"){
//                             console.log(`${threePokemonResults[i].name}: ${res.data.flavor_text_entries[j].flavor_text}`);
//                             break;
//                         }
//                     }
//                     })
//             )
//         }
// })

//Instead of relying on console.log, let's create a UI for these random Pokemon. Build an Html page that lets you click a button to generate data from three randomly chosen pokemon. include the name of the pokemon, an image of the pokemon, and the description of its species which you found in the above exercise.  

$pokemonButton = $('#pokemon-button')
$pokemonDivs = $('.pokemon-div')

$pokemonButton.on('click', function(){
    $pokemonDivs.empty();
    let Pokemon = []
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
        .then(res => {
            Pokemon = res.data.results
            let threePokemon = []
            let randomNums = []
            let threePokemonResults = [{}, {}, {}]
            for (let i = 1; i < 4; i++){
                randomNums.push(Math.floor(Math.random() * 1302));
            }
            for (let i = 0; i < 3; i++) {
                threePokemon.push(
                    axios.get(`${Pokemon[randomNums[i]].url}`)
                    .then(res => {
                        threePokemonResults[i]['name'] = res.data.name;
                        threePokemonResults[i]["image"] = res.data.sprites.front_default;
                        return axios.get(`${res.data.species.url}`)
                    })
                    .then(res => {
                            console.log(res);
                            console.log(i);
                            for (let j = 0; j < res.data.flavor_text_entries.length; j++){
                            if (res.data.flavor_text_entries[j].language.name === "en"){
                                threePokemonResults[i]['desc'] = res.data.flavor_text_entries[j].flavor_text;
                                console.log(threePokemonResults);
                                break;
                            }
                        }
                        $name = $(`<div>${threePokemonResults[i]['name']}</div>`);
                        $image = $(`<div><img src=${threePokemonResults[i]['image']}></div>`);
                        $desc = $(`<div>${threePokemonResults[i]['desc']}</div>`);
                        $div = $('<div class="display-div"></div>')
                        $div.append($name);
                        $div.append($image);
                        $div.append($desc);
                        $pokemonDivs.append($div);
                        })
                )
            }
    })    
})