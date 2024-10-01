import ManageTabLayout from '../../../layouts/ManageTabLayout';

const ChallTab = () => {
    return (
        <ManageTabLayout title="Chall" createNewFunc={() => console.log('oke')}>
            <h2>123</h2>
        </ManageTabLayout>
    );
};

export default ChallTab;
