import React from 'react'

type Checkbox = {
    value?: boolean,
    title: string,
    onChange: (title: string) => void;
}

const Checkbox = ({value, title, onChange}: Checkbox) => {

    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     va
    // }
    
    const onClick = (e:React.MouseEvent<HTMLInputElement>) => {
        onChange(title)
    }

    return (
        <>
        <input defaultChecked={true} onClick={onClick} type="checkbox" checked={value}/><span>{title}</span>
        </>
    )
}



export default Checkbox