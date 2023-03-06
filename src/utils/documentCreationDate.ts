export default (id: string): Date => {

  return new Date(parseInt(id.toString().slice(0, 8), 16) * 1000);

};
