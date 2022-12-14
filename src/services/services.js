const postData = async (url, data) => {
    
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const editData = async(url, data) => {
    
    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

const deleteData = async(url) => {
    
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    });

    return await res.json();
}

export {postData, editData, deleteData, getData};