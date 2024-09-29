import React, { useEffect, useState } from 'react';
import { CardBox } from '../CardBox';
import axiosInstance from '../../services/Axios';
import { ChallData } from '../../types/challdata';
import { AppContext, AppContextType } from '../../contexts/app/AppContext.tsx';

type Props = {
    challId: string;
};

const ChallCard = (props: Props) => {
    const { openModal } = React.useContext(AppContext) as AppContextType;
    const [challData, setChallData] = useState<ChallData>();

    useEffect(() => {
        const fetchChallData = async () => {
            try {
                const response = await axiosInstance.get<ChallData>(`/c?id=${props.challId}`);
                console.log(response.data);
                setChallData(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchChallData();
    }, [props.challId]);

    return (
        <CardBox
            selectable
            onClickHandler={() =>
                openModal({
                    challId: '1123',
                    title: '123',
                    category: 'asvv',
                    solveStatus: true,
                    bookmarked: true,
                    credit: {
                        name: 'adsad',
                        url: 'ádsda',
                    },
                    badges: ['asd', 'asda'],
                })
            }
        >
            <div className="challcard">
                <div className="title">
                    <h6>Web Exploitation</h6>
                    <i className="fa-solid fa-check"></i>
                </div>
                <div className="challdetail">
                    <h6>FindMe</h6>
                    <div className="credit">
                        <p>Credit: PicoCTF</p>
                    </div>
                </div>
            </div>
        </CardBox>
    );
};

export default ChallCard;
