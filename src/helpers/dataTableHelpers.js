export const sortProvider = (nameProperty) => {
    return (order) => (obj1, obj2) => {
        const val1 = obj1.data[nameProperty].toLowerCase();
        const val2 = obj2.data[nameProperty].toLowerCase();
        if (val1 < val2) return order === 'asc' ? -1 : 1
        if (val1 > val2) return order === 'asc' ? 1 : -1
        return 0
    }
}