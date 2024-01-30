import { createSlice } from '@reduxjs/toolkit'

export const amm = createSlice({
	name: 'amm',
	initialState: {
		contract: null,
		shares: 0,
		swaps: [],
		depositing: {
			isDepositing: false,
			isSuccess: false,
			transactionHash: null
		},
		swapping: {
			isSwapping: false,
			isSuccess: false,
			transactionHash: null
		}
	},
	reducers: {
		setContract: (state, action) => {
			state.contract = action.payload
		},
		sharesLoaded: (state, action) => {
			state.shares = action.payload
		},
		depositRequest: (state, action) => {
			state.depositing.isDepositing = true
			state.depositing.isSuccess = false
			state.depositing.transactionHash = null
		},
		depositSuccess: (state, action) => {
			state.depositing.isDepositing = false
			state.depositing.isSuccess = true
			state.depositing.transactionHash = action.payload
		},
		depositFail: (state, action) => {
			state.depositing.isDepositing = false
			state.depositing.isSuccess = false
			state.depositing.transactionHash = null
		},
		swapRequest: (state, action) => {
			state.swapping.isSwapping = true
			state.swapping.isSuccess = false
			state.swapping.transactionHash = null
		},
		swapSuccess: (state, action) => {
			state.swapping.isSwapping = false
			state.swapping.isSuccess = true
			state.swapping.transactionHash = action.payload
		},
		swapFail: (state, action) => {
			state.swapping.isSwapping = false
			state.swapping.isSuccess = false
			state.swapping.transactionHash = null
		}
	}
})

export const { 
	setContract, 
	sharesLoaded, 
	depositRequest,
	depositSuccess,
	depositFail,
	swapRequest,
	swapSuccess,
	swapFail
} = amm.actions;

export default amm.reducer; 
