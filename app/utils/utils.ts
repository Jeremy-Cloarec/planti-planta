export const  formatedUrl = (title:string) =>  title.toLowerCase().split(" ").join("_")

export const handlePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();
    setter(prev => !prev);
};