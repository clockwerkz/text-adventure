const playerInput = document.getElementById('player-input');

class gameEngine {
    constructor(appRoot) {
        this.app = appRoot;
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
        this.app.innerHTML = `
        <h1 id="title">${title}</h1>
        <p id="description">${description}</p>
        <p id="items">${this.renderItems(items)}</p>
        <p id="locations">${this.renderLocations(locations)}</p>
        `;
    }

    renderItems(items) {
        
        return ( items ? 'items available: '+items.join(',') : 'There are no items.' );
    }

    renderLocations(locations) {
        return (locations ? 'You can to these locations from here: '+locations.join(',') : 'There are no locations.');
    }

    parseInput(input) {
        const inputArr = input.split('');
        let cmd = inputArr;
        switch(cmd) {
            default: 
            this.fetchLocation(cmd);
        }
    }
}


const game = new gameEngine(document.getElementById('app-root'));

playerInput.addEventListener('submit', (e)=> {
    e.preventDefault();
    const playerText = document.getElementById('input-text');
    game.parseInput(playerText.value);
    playerText.value='';
});