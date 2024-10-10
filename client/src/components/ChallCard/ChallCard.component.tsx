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
                const response = await axiosInstance.get<ChallData>(`/chall/${props.challId}`);
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
                    challName: challData.challName,
                    category: challData.category,
                    tags: challData.tags,
                    source: challData.source,
                    sourceUrl: challData.sourceUrl,
                    staticFileName: challData?.staticFileName,
                    staticFileUrl: challData?.staticFileUrl,
                    description: challData?.description,
                })
            }
        >
            <div className="challcard">
                <div className="title">
                    <h6>{challData?.category.cateName}</h6>
                    <i className="fa-solid fa-check"></i>
                </div>
                <div className="challdetail">
                    <h6>{challData?.challName}</h6>
                    <div className="credit">
                        <p>
                            Credit: <a href={challData?.sourceUrl}>{challData?.source}</a>
                        </p>
                    </div>
                </div>
            </div>
        </CardBox>
    );
};

export default ChallCard;
