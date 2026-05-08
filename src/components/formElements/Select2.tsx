import Select from 'react-select';


const Select2 = ({...rest}) =>{
    return(<>
         <Select 

            {...rest}

            className="w-full 
                rounded-sm 
                outline-none
                text-black
                border-1 
                border-gray-700
                "
            menuPosition="fixed"

            styles={{
                menu: (base) => ({
                    ...base,
                    width: "200px",
                }),
                singleValue: (base) => ({
                    ...base,
                    color: "white",
                }),
                control: (base) => ({
                    ...base,
                    minHeight: '32px',
                    height: '32px',
                    backgroundColor: "#1f2937",
                    color: "white",
                    border:0,
                    outline: "none",
                    boxShadow: "none",
                }),
                input: (base) => ({
                    ...base,
                    margin: "0px",
                    padding: "0px",
                    color: "white",
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    height: "30px",
                }),
            }}
        />
    </>);
};

export default Select2;