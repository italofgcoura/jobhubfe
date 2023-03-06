export default (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, setDataFunction: any, data: object) => {

  const key = event.target.name;

  setDataFunction({ ...data, [key]: event.target.value });

};


const handleChangeJobDescriptionObject = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, setDataFunction: any, data: any) => {

  const key = event.target.name;

  setDataFunction({ ...data, description: { ...data.description, [key]: event.target.value } });

};

const handleChangeAddressObject = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, setDataFunction: any, data: any) => {

  const key = event.target.name;

  setDataFunction({ ...data, address: { ...data.address, [key]: event.target.value } });

};

export { handleChangeJobDescriptionObject, handleChangeAddressObject };
