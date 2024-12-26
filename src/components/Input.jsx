import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
    {label && (
        <label className='inline-block mb-1 pl-1 text-gray-300' htmlFor={id}>
            {label}
        </label>
    )}
    <input
        type={type}
        className={`block w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${className}`}
        ref={ref}
        {...props}
        id={id}
    />
</div>

    )
})

export default Input