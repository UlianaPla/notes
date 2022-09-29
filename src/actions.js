export const add = (item) => ({ type: 'ADD', payload: item });
export const del = (id) => ({ type: 'DEL', payload: id });
export const update = (item) => ({ type: 'UPDATE', payload: item });
export const loaded = (items) => ({ type: 'LOADED', payload: items });
export const showModal = (item = undefined) => ({ type: 'SHOW_MODAL' , payload:item});
export const hideModal = () => ({ type: 'HIDE_MODAL' });
export const showAlert = (text) => ({ type: 'SHOW_ALERT', payload:text });
export const hideAlert = () => ({ type: 'HIDE_ALERT' });
