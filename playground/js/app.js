rooms = {
    'a': {
      title: 'Room A',
      description: 'You are in a room. Room B is to the North. To the east, there is a closet. The closet door is closed.',
      routes: {
        'b':{
        locked: false,
        },
        'closet': {
        locked: true,
        message: "The Closet door is locked"
        }
      },
    },
    'a_unlocked': {
      title: 'Room A',
      description: 'You are in a room. Room B is to the North. To the east, there is a closet. The closet door is now open.',
      routes: {
        'b':{
        locked: false
        },
        'closet': {
        locked: false
        }
      },
    },
    'b': {
      title: 'Room B',
      description: 'You are in a room. Room A is through the open door to the south. On the floor nearby there is a key.',
      routes: {
        'a':{
        locked: false,
        },
        'closet': {
        locked: true,
        message: "The Closet door is locked"
        }
      },
      items: ['key']
    }
  }
  
  const items = {
    'key': {
      description: 'A worn out brass key with no other indications on it, appears to be a key for an indoor lock.',
      use: ['a'],
      message: 'You unlocked the closet door.'
    }
  }



const playerInput = document.getElementById('player-input');
const app = document.getElementById('app-root');
const inventory = [];
const unlocked = [];

function render(route, descriptionOnly = false) {
    let room = rooms[route];
    let desc = `
        ${descriptionOnly ? '' : '<h2>'+room.title+'</h2>'}
        <p>${room.description}</p>
    `;
    app.innerHTML += desc;
} 

function renderPartial(str) {   
    app.innerHTML += `<p>${str}</p>`;
}


function parseInstruction(input) {
    let arr = input.trim().split(' ');
    console.log(arr);
    if (arr.length === 1) parseOneCmd(arr[0]);
    else return parseMultiCmd(arr);
  }
  
  
function parseOneCmd(cmd) {
    
    switch(cmd) {
        case 'look':
            render(current, true);
            break;
        default:
    }
}

function parseMultiCmd([ cmd, obj ]) {
    switch(cmd) {
        case 'take':
        case 'get':
        case 'grab':
        if (isValidItem(obj)) {
            inventory.push(obj);
            renderPartial(`You take the ${obj}.`);
        } else {
            renderPartial(`${obj} is not present here.`);
        }
        console.log(inventory);
        break;
        case 'goto':
        case 'visit':
            if (isValidLocation(obj)) {
                visitLocation(obj);
            }
            break;
        case 'examine':
            if (isValidItem(obj)) {
                renderPartial(items[obj].description);
            } else {
                renderPartial(`There is no ${obj} here.`);
            }
            break;
        case 'use':
          break;
        default:
    }
}

function visitLocation(room) {
    current = room;
    render(room);
  }


function isValidItem(item) {
    return items.hasOwnProperty(item) &&  rooms[current].hasOwnProperty(items) && rooms[current].items.indexOf(item) !== -1;
}


function isValidLocation(room) {
    return rooms.hasOwnProperty(room);
}


playerInput.addEventListener('submit', (e)=> {
    e.preventDefault();
    let input = document.getElementById('input-text').value;
    parseInstruction(input);
    document.getElementById('input-text').value = '';
});



let current = 'a';
render(current);