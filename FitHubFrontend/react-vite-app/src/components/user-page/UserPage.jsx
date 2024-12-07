import React, { useState, useEffect } from "react";
import Training from "../trainings/Training";
import { getContact } from "../../api/TrainService";

export default function UserPage({cards}) {

  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState({})
  const [targetTraining, setTargetTraining] = useState(null);



  // Шаблон данных пользователя
  const [userData, setUserData] = useState({
    id: 11,
    name: null,
    surname: null,
    login: null,
    birthday: null,
    email: null,
    password: null,
    gender: null,
    age: null,
    role: "ROLE_USER",
    trains: [],
    ratings: [],
    userStatistics: {
        skill: null,
        countOfTrains: null,
        weight: null,
        height: null,
        ibw: null
    }
});
  const targetId = localStorage.getItem(`bookmarkedTraining-${userData.login}`); // ID нужной тренировки

  useEffect(() => {
    const fetchTargetTraining = async () => {
      try {
        const response = await getContact(targetId);
        if (response.status === 200) {
          const training = response.data;
          setTargetTraining(training); // Сохраняем данные тренировки
          handleGetTrainStats(training); // Получаем статистику сразу после загрузки тренировки
        } else {
          console.error("Ошибка получения тренировки:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса к API:", error);
      }
    };
  
    fetchTargetTraining();
  }, [targetId]);

  useEffect(() => {
      // Проверяем, есть ли данные, и обновляем состояние
      if (cards?.content) {
          setFilteredData(cards.content);
      }
  }, [cards, targetId]);

  useEffect(() => {
    console.log("Обновленные данные:", userData);
    handleGetStats()
  }, []);

  useEffect(() => {
    if (filteredData?.length > 0) {
        const training = filteredData.find((item) => item.id === targetId); // Ищем тренировку с нужным ID
        if (training) {
            handleGetTrainStats(training); // Получаем статистику для найденной тренировки
        }
    }
  }, [filteredData, targetId]); // Выполняется при изменении filteredData или targetId



  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
        // Если поле относится к userStatistics
        if (["height", "weight"].includes(name)) {
            return {
                ...prev,
                userStatistics: {
                    ...prev.userStatistics,
                    [name]: value ? parseInt(value, 10) : null,
                },
            };
        }

        // Для остальных полей, включая age
        return {
            ...prev,
            [name]: name === "age" ? (value.trim() ? parseInt(value, 10) : null) : value,
        };
    });
};


  // Обработчик отправки данных
  const handleSubmit = async () => {
    try {
        const data = {
          name: userData.name,
          surname: userData.surname,
          login: userData.login,
          birthday: userData.birthday,
          email: userData.login,
          password: userData.password,
          gender: userData.gender,
          age: userData.age,
          role: userData.role,
          trains: userData.trains,
          ratings: userData.ratings,
          userStatistics: {
            skill: userData.userStatistics.skill,
            countOfTrains: userData.userStatistics.countOfTrains,
            weight: userData.userStatistics.weight,
            height: userData.userStatistics.height,
            ibw: userData.userStatistics.ibw
        }
        }
        console.log(data)
        const response = await fetch(`http://localhost:8081/users/${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных");
      }
      alert("Данные успешно обновлены!");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };


  const handleGetTrainStats = async (training) => {
    try {
        console.log(training.id);
        const response = await getContact(training.id);
        console.log("Response от getContact:", response);
        setStats({
            used: response.data.used,
            duration: response.data.durationInMinutes,
            calories: 0,
        });

    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        if (error instanceof TypeError) {
            console.error("Ошибка типа (скорее всего, ошибка сети или CORS).");
        }
    }
  };


  const handleGetStats = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
        if (!token) {
            console.error("Токен отсутствует. Пользователь не авторизован.");
            return;
        }

        console.log("Используемый токен:", token);

        const response = await fetch(`http://localhost:8081/users/lk`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            }
        });

        console.log("Статус ответа:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Ошибка: ${response.status} ${response.statusText}`);
            console.error(`Тело ошибки: ${errorText}`);
        }
        if (response.ok) {
            const data = await response.json();
            console.log("Полученные данные:", data);
            if (data.userStatistics == null){
              data.userStatistics = {
                skill: null,
                countOfTrains: null,
                weight: null,
                height: null,
                ibw: null
              }
            }
            setUserData(data)
            console.log(`Сохраненные данные: ${userData}`)
        } 
        else {
            const errorText = await response.text();
            console.error("Ответ сервера:", response.status, response.statusText, errorText);
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        if (error instanceof TypeError) {
            console.error("Ошибка типа (скорее всего, ошибка сети или CORS).");
        }
    }
    
};


  return (
    <>
      <main>
        <section className="personal-account">
          <div className="first-row">
            <img className="personal-avatar" src="./src/img/placeholder.png" alt="Аватар" />
            <div className="personal-account-parameters">
                <input
                  className="second-name"
                  placeholder="Фамилия"
                  name="surname"
                  value={userData.surname}
                  onChange={handleChange}
                />
              <input
                className="name"
                placeholder="Имя"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <input
                className="third-name"
                placeholder="Логин"
                name="login"
                value={userData.login}
                onChange={handleChange}
              />
              <div className="account-info">
                <input
                  className="height"
                  placeholder="Рост"
                  name="height"
                  value={userData.userStatistics.height}
                  onChange={handleChange}
                />
                <span className="postinput">см</span>
              </div>
              <div className="account-info">
                <input
                  className="weight"
                  placeholder="Вес"
                  name="weight"
                  value={userData.userStatistics.weight}
                  onChange={handleChange}
                />
                <span className="postinput">кг</span>
              </div>
              <div className="account-info">
                <input
                  className="age"
                  placeholder="Возраст"
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                />
                <span className="postinput">лет</span>
              </div>
              <div className="account-info">
                <input
                type="text"
                className="gender"
                placeholder="Пол"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                />
                <span className="postinput">пол</span>
              </div>
              
            <button style={{borderRadius:"20px", border: "none", fontFamily: 'UNCAGE', padding: '10px'}} onClick={handleSubmit}>Сохранить</button>
            </div>
          </div>
        </section>

            <section className="featured-workout">
                <div className="wrapper">
                    <p className="wrapper-text">избранная тренировка</p>
                </div>
                <div className="featured-workout-container">
                    <img className="background" src="./src/img/image.png.png" />
                    {targetTraining
                        ? <Training training={targetTraining} key={targetTraining.id} />
                        : <p style={{marginLeft: '160px', display: 'flex', alignItems: 'center', textAlign: 'center'}}>У вас пока нет <br />избранной тренировки</p>
                    }

                    <ul className="featured-workout-tags">
                        <li className="featured-workout-tag tag-count">{stats.used} повторений</li>
                        <li className="featured-workout-tag tag-time">общей длительности <br />{stats.duration * stats.used || ''} минут</li>
                        <li className="featured-workout-tag tag-kkal">автор: вы</li>
                    </ul>
                </div>
            </section>      
            <section className="history-trainings-desktop">
                <div className="wrapper">
                    <p className="wrapper-text">мои тренировки</p>
                </div>
                <div className="training-cards-container">
                    <ul className="training-cards">
                        <li className="training-card">
                                <figure>
                                    <img className="training-img"></img>
                                </figure>
                                <div className="training-type-box">
                                    <ul className="tag-list">
                                        <li className="cardio-red"><a href="#">кардио</a></li>
                                        <li className="long"><a href="#">долго</a></li>
                                    </ul>
                                </div>
                                <h3>тренировка №1</h3>
                                <p className="card-description">Описание тренировки</p>
                        </li>
                        <li className="training-card">
                            <figure>
                                <img className="training-img"></img>
                            </figure>
                            <div className="training-type-box">
                                <ul className="tag-list">
                                    <li className="cardio-red"><a href="#">силовая</a></li>
                                    <li className="fast"><a href="#">быстро</a></li>
                                </ul>
                            </div>
                            <h3>тренировка №2</h3>
                            <p className="card-description">Описание тренировки</p>
                        </li>
                        <li className="training-card">
                            <figure>
                                <img className="training-img"></img>
                            </figure>
                            <div className="training-type-box">
                                <ul className="tag-list">
                                    <li className="cardio-red"><a href="#">йога</a></li>
                                </ul>
                            </div>
                            <h3>тренировка №3</h3>
                            <p className="card-description">Описание тренировки</p>
                        </li>
                    </ul>
                </div>
            </section> 
        </main>
    </>
    )
}