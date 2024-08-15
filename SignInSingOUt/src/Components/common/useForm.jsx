import React, { useState } from 'react'
export default function useForm(initialFValues) {


    const [values, setValues] = useState(initialFValues);

    const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();


    const handleChange = (e, format) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: (format === true) ? CurdateFormated(new Date(value)) : value
        })
    }



    return {
        values,
        setValues,
        handleChange
    };
}


export default function Form(props) {
    const { ...other } = props;
    return (
        <form {...other}>
            {props.children}
        </form>
    )
}

