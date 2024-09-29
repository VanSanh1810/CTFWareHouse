import React from 'react';

type Props = {
    type?: 'default' | 'icon';
    children: React.ReactNode;
};

const Button = (props: Props) => {
    return (
        <>
            {props.type ? (
                props.type === 'icon' ? (
                    <button className='iconbtn'>{props.children}</button>
                ) : (
                    <button className='defaultbtn'>{props.children}</button>
                )
            ) : (
                <button>{props.children}</button>
            )}
        </>
    );
};

export default Button;
