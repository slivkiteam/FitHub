import { useState } from 'react';
import './css/Main.css';

export default function FilterVariation(props) {
    const { title, tags } = props;

    const [expType, setExpType] = useState('no_exp');
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [selectedTags, setSelectedTags] = useState(Array(tags.length).fill(false)); // массив для отслеживания состояния иконок

    // Функция для переключения иконки
    const toggleTagIcon = (index) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = [...prevSelectedTags];
            newSelectedTags[index] = !newSelectedTags[index]; // инвертируем значение
            return newSelectedTags;
        });
    };

    return (
        <>
            {expType === "no_exp" ? (
                <p className="filter__variation">
                    {title}
                    <a href="#!" className="filter__arrow" onClick={() => setExpType('exp')}>
                        <img src="src/img/arrow.svg" alt="" />
                    </a>
                </p>
            ) : (
                <div className="expand__variation" style={{ backgroundColor: backgroundColor, borderRadius: '20px' }}>
                    <p className="filter__variation">
                        {title}
                        <a href="#!" className="filter__arrow" onClick={() => { setExpType('no_exp'); setBackgroundColor('white'); }}>
                            <img src="src/img/arrow.svg" alt="" />
                        </a>
                    </p>
                    <div className={`expand-settings ${expType === 'exp' ? 'expand-settings--visible' : ''}`} style={{ backgroundColor: backgroundColor, borderRadius: '20px' }}>
                        {tags.slice(0, 4).map((tag, index) => (
                            <div className="setting-container" key={index} onClick={() => toggleTagIcon(index)}>
                                <img
                                    src={selectedTags[index] ? "src/img/check_circle.svg" : "src/img/check_circle_outline.svg"}
                                    alt=""
                                    className="choose"
                                />
                                <p className={`buttons-list__item tag_${index % 4 === 0 ? 'green' : index % 4 === 1 ? 'yellow' : index % 4 === 2 ? 'red' : 'purple'}`}>
                                    {tag}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
