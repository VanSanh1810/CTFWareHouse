import React from 'react';

type Props = {
    type?: 'default' | 'icon';
    children: React.ReactNode;
    onClickFunc?: () => void;
};

const Button = (props: Props) => {
    return (
        <>
            {props.type ? (
                props.type === 'icon' ? (
                    <button className="iconbtn" onClick={props.onClickFunc}>
                        {props.children}
                    </button>
                ) : (
                    <button className="defaultbtn" onClick={props.onClickFunc}>
                        {props.children}
                    </button>
                )
            ) : (
                <button>{props.children}</button>
            )}
        </>
    );
};

export default Button;
