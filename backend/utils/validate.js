const isEmpty = (value)=>{
    return value === undefined || value === null
}

const isNotString = (value)=>{
    return typeof value !== 'string' || value.trim().length === 0
}

const isNotNumber = (value)=>{
    return typeof value !== 'number' || value < 0 || isNaN(value) || !Number.isInteger(value)
}

module.exports = {
    isEmpty,
    isNotString,
    isNotNumber
}