console.log('client app connected');
const title = document.getElementById('title');
const description = document.getElementById('description');
const items = document.getElementById('items');
const locations = document.getElementById('locations');
const playerInput = document.getElementById('player-input');

playerInput.addEventListener('submit', (e)=> {
    e.preventDefault();
    const playerText = document.getElementById('input-text');
    console.log(playerText.value);
}); 

class gameEngine {
    constructor(title, description, items, locations) {
        this.title = title;
        this.description = description;
        this.items = items;
        this.locations = locations;
        this.fetchLocation();
    }

    fetchLocation(location) {
        const url = location ? `/game/loc/${location}` : '/game/start';
        fetch(url)
        .then(res => res.json())
        .then((data)=> {
            this.render(data);
        })
        .catch(err => console.log(err));
    }

    render({ title, description, items, locations }) {
        this.title.textContent = title;
        this.description.textContent = description;
        this.items.textContent = this.renderItems(items);
        this.locations.textContent = this.renderLocations(locations);
    }

    renderItems(items) {
        
        return ( items ? 'items available: '+items.join(',') : 'There are no items.' );
    }

    renderLocations(locations) {
        return (locations ? 'You can to these locations from here: '+locations.join(',') : 'There are no locations.');
    }

    parseInput(input) {
        this.fetchLocation(input);
    }
}


const game = new gameEngine(title, description, items, locations);

playerInput.addEventListener('submit', (e)=> {
    e.preventDefault();
    const playerText = document.getElementById('input-text');
    game.parseInput(playerText.value);
    playerText.value='';
});