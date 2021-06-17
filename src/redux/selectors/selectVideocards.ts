import { RootState } from "../store";
import { IVideocardState } from "../videocardReducer";
import { createSelector } from '@reduxjs/toolkit';

const videocardsSelector = (state: RootState) => {
    return state.rootReducer.videocardReducer.videocards
}

const selectedShopsSelector = (state: RootState) => {
    return state.rootReducer.videocardReducer.selectedShops
}

export const currentPageSelector = (state: RootState) => {
    return state.rootReducer.videocardReducer.currentPage
}

export const limitPagesSelector = (state: RootState) => {
    return state.rootReducer.videocardReducer.limitPages
}

export const filteredTodos = createSelector(
    [videocardsSelector, selectedShopsSelector, currentPageSelector, limitPagesSelector],
    (videocards, selectedShops, currentPage: number, limit: number) => {
        return videocards
        .filter((videocard) => selectedShops?.includes(videocard.shop))
    }
)