import OpenFilterButton from "./OpenFilter"

export default function SortMenu(props){
    const {sortItem} = props
    return (
        <p className="sort-menu">
            сортировка: {sortItem}
            <OpenFilterButton/>
        </p>
    )
}