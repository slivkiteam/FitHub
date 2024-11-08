import Training from "./Training";
import MainFooter from '../blocks/MainFooter';
import Header from "./Header";
import Main from "./Main";
import {Routes, Route} from 'react-router-dom'

function Trainings({data, currentPage, getAllContacts}) {
    return (
        <>
            <Header />
            <Main data={data} currentPage={currentPage} getAllContacts={getAllContacts}/>
            <MainFooter/>
        </>
    )
}

export default Trainings;