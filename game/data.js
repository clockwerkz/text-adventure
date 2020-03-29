module.exports = {
    'start' : {
        title: 'Game Start',
        description: 'You\'re at the start. This is a room description.',
        items: ['key'],
        locations: ['a','b','c']
    },
    'a' : {
        title: 'Room A',
        description: 'You\'re in Room A. This is a room description.',
        items: [],
        locations: ['start','b','c']
    },
    'b' : {
        title: 'Room B',
        description: 'You\'re in Room B. This is a room description.',
        items: [],
        locations: ['start','a','c']
    },
    'c' : {
        title: 'Room C',
        description: 'You\'re in Room C. This is a room description.',
        items: ['Piece of Paper'],
        locations: ['start','a','b']
    }
}