// disopatcherから渡されたactionに応じてStoreを書き換える

const initilaState = {
    userId: 0,
    userName: '',
    userHasPoints: 0,
};

export default function reducer(state = initilaState,action){
    switch(action.type){
        //SET_USERのactionを受け取った場合の処理
        case 'SET_USER':
            // stateを直接変更しないよう、Object.assignでstateを複製
            return Object.assign({},state,{
                //actionから渡された値でstateを書き換える
                userName: action.text
            });

        case 'SET_USER_ID':
            return Object.assign({},state,{
                userId: action.id
        });

        default:
            return state;
    }
}