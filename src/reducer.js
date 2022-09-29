
const initialState = {
    items: [],
    dataisLoaded: false,
    needShowModal: false,
    needShowAlert: false,
    alertText: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADED":
            return {
                ...state,
                items: action.payload,
                dataisLoaded: true,
            };
        case "ADD":
            return {
                ...state,
                items: [...state.items, action.payload],
                needShowAlert: true,
                alertText: 'Note has been added'
            };

        case "UPDATE":
            const result = state.items.filter(elem => elem.id !== action.payload.id);
            result.push(action.payload);

            return {
                ...state,
                items: result,
                needShowAlert: true,
                alertText: 'Note has been updated'
            };
        case "DEL":
            return {
                ...state,
                items: state.items.filter(elem => elem.id !== action.payload),
                needShowAlert: true,
                alertText: 'Note has been deleted'
            };
        case "SHOW_MODAL":
            return {
                ...state,
                needShowModal: true
            };
        case "HIDE_MODAL":
            return {
                ...state,
                needShowModal: false
            };
        case "SHOW_ALERT":
            return {
                ...state,
                needShowAlert: true,
                alertText: action.payload
            };
        case "HIDE_ALERT":
            return {
                ...state,
                needShowAlert: false,
                alertText: ''
            };
        default:
            return state;
    }
}

export default reducer;