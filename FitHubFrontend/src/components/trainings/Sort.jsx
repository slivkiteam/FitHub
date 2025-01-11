import { useState } from 'react';
import './css/Main.css'

export default function SortTrainings({ onSortChange }) {

    const [exp, setExp] = useState('no_exp');
    const [sortCrit, setSortCrit] = useState('сначала быстрые');

    const handleSortChange = (newSortCrit) => {
        setSortCrit(newSortCrit);
        setExp('no_exp');
        const sortValue = newSortCrit === 'сначала долгие' ? 'more' : 'less';
        onSortChange(sortValue);
    };

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
                    <ul className='sort-list'>
                        <a href="#!" onClick={() => handleSortChange('сначала быстрые')} className="sort-item">сначала быстрые</a>
                        <a href="#!" onClick={() => handleSortChange('сначала долгие')} className="sort-item">сначала долгие</a>
                    </ul>
                </div>
            </div>
            </>
        )}
        </>
    );
}