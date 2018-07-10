// dispatcherに渡すactionの定義を行う
// action creator アクションオブジェクト生成を担う

export const setUser = text => ({
    type: 'SET_USER', //actionのタイプ,reducerで判別される
    text //reducerで更新に使う値
})

export const setUserId = id => ({
    type: 'SET_USER_ID',
    id
})