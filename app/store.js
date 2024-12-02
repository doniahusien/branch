const { configureStore } = require("@reduxjs/toolkit");
const cakeReducer = require("@reduxjs/toolkit");
const juiceReducer = require("@reduxjs/toolkit")


const store = configureStore({
    reducers: {
        cake: cakeReducer,
        juice:juiceReducer
}
})
module.exports= store