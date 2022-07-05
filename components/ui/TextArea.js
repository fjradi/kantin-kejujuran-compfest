import { useRef, useEffect, useState } from "react";

const TextArea = ({label, externalRef, validateValue, errorMessage, otherConfig}) => {
    const internalRef = useRef(null);
    const [error, setError] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        externalRef.current = internalRef.current;
    }
    , [internalRef.current]);

    return (
        <div>
            <label htmlFor={label} className="text-gray-700 text-sm font-bold">{label}</label>
            <textarea onBlur={(e) => {setIsTouched(true)}} onChange={(e) => {setError(!validateValue(e.target.value))}} ref={internalRef} id={label} {...otherConfig} className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            {(error && isTouched) && <p className="text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
}

export default TextArea;