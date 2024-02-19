const randomDate = () => {
    const start = new Date(2000, 0, 1); 
    const end = new Date(); 
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
export default randomDate