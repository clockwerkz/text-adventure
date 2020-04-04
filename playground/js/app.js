rooms = {
    'a': {
      title: 'Room A',
      status: 'default',
      description: {
        'default': 'You are in a room. Room B is to the North. To the east, there is a closet. The closet door is closed.',
        'closet_unlocked' : 'You are in a room. Room B is to the North. To the east, there is a closet. The closet door is now open.'
      },
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
    'b': {
      title: 'Room B',
      status: 'default',
      description: {
        'default': 'You are in a room. Room A is through the open door to the south. On the floor nearby there is a key.',
        'noKey': 'You are in a room. Room A is through the open door to the south.'
      },
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
    },
    'closet': {
      title: 'The Closet',
      status: 'default',
      description: {
        'default': 'You made it into the closet, there are a lot of skeletons in here. There is only one way out to the West, back to Room A.'
      },
      routes: {
        'a':{
        locked: false,
        },
      },
    }
  }
  
  const items = {
    'key': {
      description: 'A worn out brass key with no other indications on it, appears to be a key for an indoor lock.',
      statusChange: {
        'a': 'closet_unlocked',
        'b': 'noKey'
      },
      routeOpen: {
        'a': 'closet'
      },
      message: {
        'a':'You unlocked the closet door.'
      }
    }
  }



const playerInput = document.getElementById('player-input');
const app = document.getElementById('app-root');
const inventory = [];
const unlocked = [];
let current = '';
const visitedRooms = {};


function render(room, descriptionOnly = false) {
  let status = room.status;
    let desc = `
        ${descriptionOnly ? '' : '<h2>'+room.title+'</h2>'}
        <p>${room.description[status]}</p>
    `;
    app.innerHTML += desc;
} 

function renderPartial(str) {   
    app.innerHTML += `<p>${str}</p>`;
}


function parseInstruction(input) {
    let arr = input.trim().split(' ');
    arr = arr.map(item => item.toLowerCase());
    console.log(arr);
    if (arr.length === 1) parseOneCmd(arr[0]);
    else return parseMultiCmd(arr);
  }
  
  
function parseOneCmd(cmd) {
    
    switch(cmd) {
        case 'look':
          render(visitedRooms[current], true);
          break;
        case 'help':
          renderHelp();
          break;
        default:
    }
}

function renderHelp() {
  let str = `"Visit(or Goto) Location" to move to a new location\n"Take(or Grab) Item" to pick up/take an item\n"Look" to inspect the current room\n"Help" to list Help instructions`;
  str.split('\n').map(el => renderPartial(el));

}
function parseMultiCmd([ cmd, obj ]) {
    switch(cmd) {
        case 'take':
        case 'get':
        case 'grab':
          if (isValidItem(obj)) {
            console.log(current);
            inventory.push(obj);
            renderPartial(`You take the ${obj}.`);
            visitedRooms[current].status = items[obj].statusChange[current];
            console.log(visitedRooms[current]);
        } else {
            renderPartial(`${obj} is not present here.`);
        }
        console.log(inventory);
        break;
        case 'goto':
        case 'visit':

          if (isValidLocation(obj) && obj !== current) {
            if (!visitedRooms[current].routes[obj].locked) {
              visitLocation(obj);
            } else {
              console.log(visitedRooms[current].routes[obj]);
              renderPartial(visitedRooms[current].routes[obj].message);
            }
          } else {
            if (current !== obj) {
              renderPartial(`${obj} is not a Valid Location.`);
            } else {
              renderPartial(`You are currently at ${obj}!`);
            }
            
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
            if (inventory.indexOf(obj)!==-1) {
              if (items[obj].statusChange.hasOwnProperty(current)) {
                item = items[obj];
                if (item.routeOpen.hasOwnProperty(current)) {
                  let unlockRoom = item.routeOpen[current];
                  console.log(unlockRoom);
                  visitedRooms[current].routes[unlockRoom].locked = false;
                }
                visitedRooms[current].status = item.statusChange[current];
                renderPartial(item.message[current]);
              }
            } else {
              renderPartial(`You do not have ${obj}`);
            }
          break;
        default:
    }
}

function visitLocation(room) {
    current = room;
    if (!visitedRooms.hasOwnProperty(current)) {
      visitedRooms[current] = rooms[current];
      console.log(visitedRooms);
    } 
    render(visitedRooms[current]);
  }


function isValidItem(item) {
    return items.hasOwnProperty(item) &&  visitedRooms[current].hasOwnProperty('items') && visitedRooms[current].items.indexOf(item) !== -1;
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




visitLocation('a');