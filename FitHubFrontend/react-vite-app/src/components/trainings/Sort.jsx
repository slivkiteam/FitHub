import { useState } from 'react';
import './css/Main.css'

export default function SortTrainings() {

    const [exp, setExp] = useState('no_exp');
    const [sortCrit, setSortCrit] = useState('сначала долгие')


    return (
        <>{exp === 'no_exp' ? (
            <div className="main__sort">
                <p className='sort-p'>сортировка: <a onClick={() => setExp('exp')} style={{ cursor: 'pointer' }}>{sortCrit}</a></p>
            </div>
        ) : (
            <>
            <div className="main__sort" style={{flexDirection: 'column', alignItems: 'start'}}>
                <div className="sort-exp-container">
                    <p className='sort-p'>сортировка: <a onClick={() => setExp('no_exp')} style={{ cursor: 'pointer' }}>{sortCrit}</a></p>
                </div>
                <div className="sort-column">
                    {/* Контент окна */}
                    <ul className='sort-list'>
                        <a href="#!" onClick={() => {setSortCrit('сначала быстрые'), setExp('no_exp')}} className="sort-item">сначала быстрые</a>
                        <a href="#!" onClick={() => {setSortCrit('сначала долгие'), setExp('no_exp')}} className="sort-item">сначала долгие</a>
                    </ul>
                </div>
            </div>
            </>
        )}
        </>
    );
}
