const stringifyData = data => {


    var result = JSON.stringify({
        ...data
    });

    return result;
};

export default stringifyData;