import './Exercise.css'

export default function Exercise({exer}){
    return (
        <div className="exer-box">
            <p className="exer-name">
                {exer.title}
            </p>
            <p className="exer-inventory">
                {exer.inventory}
            </p>
            <p className="exer-time">
                {exer.durationInSeconds} секунд
            </p>
        </div>
    );
}