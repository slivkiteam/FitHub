import { useState, useEffect } from 'react';
import './css/Main.css';

export default function FilterVariation(props) {
    const { title, tags, updateSelectedTags } = props;

    const [expType, setExpType] = useState('no_exp');
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTagIcon = (tag) => {
        setSelectedTags((prevSelectedTags) => {
            if (prevSelectedTags.includes(tag)) {
                return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
            } else {
                return [...prevSelectedTags, tag];
            }
        });
    };

    // useEffect для передачи выбранных тегов в родительский компонент при их изменении
    useEffect(() => {
        updateSelectedTags(title, selectedTags);
    }, [selectedTags, title, updateSelectedTags]);

    return (
        <>
            {expType === "no_exp" ? (
                <p className="filter__variation">
                    {title}
                    <a href="#!" className="filter__arrow" onClick={() => setExpType('exp')}>
                        <img src="./arrow.svg" alt="" />
                    </a>
                </p>
            ) : (
                <div className="expand__variation" style={{ backgroundColor: backgroundColor, borderRadius: '20px' }}>
                    <p className="filter__variation">
                        {title}
                        <a href="#!" className="filter__arrow" onClick={() => { setExpType('no_exp'); setBackgroundColor('white'); }}>
                            <img src="./arrow.svg" alt="" />
                        </a>
                    </p>
                    <div className={`expand-settings ${expType === 'exp' ? 'expand-settings--visible' : ''}`} style={{ backgroundColor: backgroundColor, borderRadius: '20px' }}>
                        {tags.slice(0, 4).map((tag, index) => (
                            <div className="setting-container" key={index} onClick={() => toggleTagIcon(tag)}>
                                <img
                                    src={selectedTags.includes(tag) ? "src/img/check_circle.svg" : "src/img/check_circle_outline.svg"}
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
