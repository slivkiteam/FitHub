import '././css/Main.css'

export default function FilterVariation(props){
    const {title} = props
    return(
        <p className="filter__variation">
            {title}
            <a href="#!" className="filter__arrow">
                <img src="src\img\arrow.svg" alt="" />
            </a>
        </p>
    )
}