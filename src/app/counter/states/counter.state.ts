// To provide a type for the state we need to use interface. 
// Wherever we need to specify typeof initialstate we can use this interface 'CounterState'

export interface CounterState {
    counter: number,
    toggle: boolean
}

export const initialState: CounterState = {
    counter: 0,
    toggle: false

}