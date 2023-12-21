import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../../instanceapi';

const initialState = {

}

export const getTotalRelawan = createAsyncThunk('relawan_chart/getTotalRelawan', async() => {
    try {
        const response = await instanceapi.get('/relawan/total').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getTotalRelawanCode = createAsyncThunk('relawan_chart/getTotalRelawanCode', async(code) => {
    try {
        const response = await instanceapi.get(`/relawan/total/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const relawanChartSlice = createSlice({
    name: 'relawan_chart',
    initialState,
    extraReducers: (builder) => {

    }
});

export default relawanChartSlice.reducer;