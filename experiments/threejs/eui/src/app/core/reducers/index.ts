import { InjectionToken } from '@angular/core';
import { ActionReducer, combineReducers, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers as coreReducers, CoreState, getAppState, localStorageSync } from '@eui/core';

import { environment } from '../../../environments/environment';

export const REDUCER_TOKEN = new InjectionToken<any>('Registered Reducers');

/**
 * Define here your app state
 *
 * [IMPORTANT]
 * There are some **reserved** slice of the state
 * that you **can not** use in your application ==> app |user | notification
 */
/* tslint:disable-next-line */
export interface AppState extends CoreState {
    // [key: string]: fromTaskManager.State | any;
}

/**
 * Define here the reduceres of your app
 */
const rootReducer = Object.assign({}, coreReducers, {
    // [fromTaskManager.namespace]: fromTaskManager.reducers,
});

export function getReducers() {
    return rootReducer;
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSync, storeFreeze] : [localStorageSync];
