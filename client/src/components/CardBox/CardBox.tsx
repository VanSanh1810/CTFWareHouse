import React, { MouseEventHandler } from 'react';

type Props = {
    children: React.ReactNode;
    selectable?: boolean;
    onClickHandler?: MouseEventHandler;
};

const CardBox = (props: Props) => {
    return (
        <div className={props.selectable ? 'cardbox selectable' : 'cardbox'} onClick={props.onClickHandler}>
            {props.children}
        </div>
    );
};

export default CardBox;
