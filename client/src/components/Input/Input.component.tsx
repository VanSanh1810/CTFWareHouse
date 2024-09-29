import React from 'react';

type Props = {
    type: 'text' | 'number' | 'checkbox' | 'radio';
};

const Input = (props: Props) => {
    return <input type={props.type} />;
};

export default Input;
