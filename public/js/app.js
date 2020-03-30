const playerInput = document.getElementById('player-input');

class gameEngine {
    constructor(appRoot) {
        this.app = appRoot;
        this.inventory = [];
        this.error = '';
        this.currentLocation = '';
        this.title='';
        this.description = '';
        this.items = [];
        this.locations = [];
        this.fetchLocation();
    }

    fetchLocation(location) {
        const url = location ? `/game/loc/${location}` : '/game/start';
        fetch(url)
        .then(res => res.json())
        .then((data)=> {
            this.updateLocation(data);
        })
        .catch(err => console.log(err));
    }

    updateLocation({ title, description, items, locations }) {
        this.title = title;
        this.description = description;
        this.items = this.items.filter(item => this.inventory.indexOf(item)===-1);
        this.locations = locations;
        console.log(this.items, this.locations);
        this.render();
    }

    render() {
        let error = this.error ? `<p>${this.error}</p>` : '';
        this.app.innerHTML = `
        <h1 id="title">${this.title}</h1>
        <p id="description">${this.description}</p>
        <p id="items">${this.renderItems()}</p>
        <p id="locations">${this.renderLocations()}</p>
        ${error}
        `;
    }

    renderItems(items) {
        return ( this.items.length > 0 ? 'items available: '+ this.items.join(',') : '' );
    }

    renderLocations(locations) {
        return (this.locations ? 'You can to these locations from here: '+this.locations.join(',') : 'There are no locations.');
    }

    parseInput(input) {
        const inputArr = input.toLowerCase().split(' ');
        let cmd = inputArr[0];
        switch(cmd) {
            case 'goto':
                let newLocation = inputArr[1];
                if (this.isValidLocation(newLocation)) {
                    this.updateLocation(newLocation);
                    this.error = '';
                } else {
                    this.error = 'Please enter a valid location'
                }
                break;
            case 'take':
                let item = inputArr[1];
                if (this.isValidItem(item)) {
                    this.inventory.push(item);
                    this.items = this.items.filter(currentItem => currentItem !== item);
                    this.error = '';
                } else {
                    this.error = 'Please enter a valid item.' 
                }
                break;
            default: 
        }
        this.render();
    }

    isValidItem(item) {
        if (item === undefined) return false;
        if (this.items.indexOf(item)===-1) return false;
        return true;
    }

    isValidLocation(location) {
        if (location === undefined) return false;
        if (this.locations.indexOf(location)===-1) return false;
        return true;
    }

}


const game = new gameEngine(document.getElementById('app-root'));

playerInput.addEventListener('submit', (e)=> {
    e.preventDefault();
    const playerText = document.getElementById('input-text');
    game.parseInput(playerText.value);
    playerText.value='';
});