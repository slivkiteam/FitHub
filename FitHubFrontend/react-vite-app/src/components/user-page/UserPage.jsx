import React, { useState } from "react";

export default function UserPage() {
  // Шаблон данных пользователя
  const [userData, setUserData] = useState({
    id: 15,
    name: "",
    surname: "",
    login: "test",
    height: null,
    weight: null,
    age: null,
    gender: "",
    userStatistics: {
      weight: null,
      height: null,
    },
  });

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["height", "weight", "age"].includes(name)) {
      // Обновление числовых значений
      setUserData((prev) => ({
        ...prev,
        [name]: value ? parseInt(value, 10) : null,
        userStatistics: {
          ...prev.userStatistics,
          [name]: value ? parseInt(value, 10) : null,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Обработчик отправки данных
  const handleSubmit = async () => {
    try {
        const response = await fetch(`http://localhost:8081/users/${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных");
      }
      alert("Данные успешно обновлены!");
    } catch (error) {
      console.error("Ошибка:", error);
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
        } else {
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
              <input
                className="height"
                placeholder="Рост"
                name="height"
                value={userData.height || ""}
                onChange={handleChange}
              />
              <input
                className="weight"
                placeholder="Вес"
                name="weight"
                value={userData.weight || ""}
                onChange={handleChange}
              />
              <input
                className="age"
                placeholder="Возраст"
                name="age"
                value={userData.age || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="gender"
                placeholder="Пол"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
              />
            <button style={{borderRadius:"20px", border: "none", }} onClick={handleGetStats}>Сохранить</button>
            </div>
          </div>
        </section>

            <section className="featured-workout">
                <div className="wrapper">
                    <p className="wrapper-text">избранная тренировка</p>
                </div>
                <div className="featured-workout-container">
                    <img className="background" src="./src/img/image.png.png" />
                    <div className="training-card">
                        <figure>
                            <img className="training-img"></img>
                        </figure>
                        <div className="training-type-box">
                            <ul className="tag-list">
                                <li className="cardio-red"><a href="#">йога</a></li>
                            </ul>
                        </div>
                        <h3>тренировка №1</h3>
                        <p className="card-description">Описание тренировки</p>
                    </div>
                    <ul className="featured-workout-tags">
                        <li className="featured-workout-tag tag-count">повторений</li>
                        <li className="featured-workout-tag tag-time">общей длительности</li>
                        <li className="featured-workout-tag tag-kkal">ккал сожжено</li>
                    </ul>
                </div>
            </section>      
            <section className="history-trainings-desktop">
                <div className="wrapper">
                    <p className="wrapper-text">история тренировок</p>
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