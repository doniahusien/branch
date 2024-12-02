const createSlice = require("@reduxjs/toolkit").createSlice

const initialState = {
    numOfCakes:8
}
const cakeSlice = createSlice({
    name: "cake",
    initialState,
    reducer: {
        buyCake: (state) => {
            state.numOfCakes--;
        },
        restock: (state, action) => {
            state.numOfCakes+=action.payload
        }
    }
})
module.exports = cakeSlice.reducer
module.exports.cakeActions= cakeSlice.actions