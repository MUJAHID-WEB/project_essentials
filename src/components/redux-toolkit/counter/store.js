import {configureStore } from '@reduxjs/toolkit'
import countersSlice from './countersSlice'

export const store = configureStore({
    reducer:{
        counters: countersSlice
    }
})