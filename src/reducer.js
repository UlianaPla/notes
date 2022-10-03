const initialState = {
    items: [],
    notesByCategory: {},
    dataIsLoaded: false,
    needShowAlert: false,
    modalInfo: {
        needShowModal: false,
        item: undefined
    },
    alertText: ''
};

const buildSummary = (data) => {
    let notesByCategory = {};

    data.forEach((item) => {
        const categoryItem = notesByCategory[item.category];
        if (categoryItem) {
            if (item.isArchived)
                categoryItem.archivedCount++;
            else
                categoryItem.activeCount++;
        }
        else {
            notesByCategory[item.category] = {
                category: item.category,
                activeCount: item.isArchived ? 0 : 1,
                archivedCount: item.isArchived ? 1 : 0
            };
        }
    });

    return notesByCategory;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADED":
            const items =  action.payload;

            return {
                ...state,
                items: items, 
                notesByCategory : buildSummary(items),
                dataIsLoaded: true,
            };
        case "ADD":
            const newItems = [...state.items, action.payload];
            return {
                ...state,
                items: newItems,
                notesByCategory : buildSummary(newItems),
                needShowAlert: true,
                alertText: 'Note has been added'
            };

        case "UPDATE":
            const updated = state.items.filter(elem => elem.id !== action.payload.id);
            updated.push(action.payload);

            return {
                ...state,
                items: updated,
                notesByCategory : buildSummary(updated),
                needShowAlert: true,
                alertText: 'Note has been updated'
            };
        case "DEL":
            const result = state.items.filter(elem => elem.id !== action.payload);
            return {
                ...state,
                items: result,
                notesByCategory : buildSummary(result),
                needShowAlert: true,
                alertText: 'Note has been deleted'
            };
        case "SHOW_MODAL":
            return {
                ...state,
                modalInfo: {
                    needShowModal: true,
                    item: action.payload
                }
            };
        case "HIDE_MODAL":
            return {
                ...state,
                modalInfo: {
                    needShowModal: false,
                    item: undefined
                }
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