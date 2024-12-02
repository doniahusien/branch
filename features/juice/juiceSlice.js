const createSlice = require("@reduxjs/toolkit").createSlice
const initialState = {
    numOfJuice:9
}
const juiceSlice=createSlice({
    name: "juice",
    initialState,
    reducer: {
        buy: (state)=>{
            state.numOfJuice--
        },
        restock: (state, action) => {
            state.numOfJuice+=action.payload
        }
    }
})

module.exports = juiceSlice.reducer
module.exports.juiceActions= juiceSlice.actions