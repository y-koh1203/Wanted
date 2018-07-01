const initilaState = {};

export default function reducer(state = initilaState,action){
    switch(action.type){
        case 'INCREMENT':
            console.log('hohgehoge');
            break;
        default:
            return state;
    }
}