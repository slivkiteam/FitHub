import React, { useState, useEffect } from "react";
import Training from "../trainings/Training";
import { getContact } from "../../api/TrainService";

export default function UserPage({cards}) {

  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState({})
  const [targetTraining, setTargetTraining] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Выбранный файл
  const [previewImage, setPreviewImage] = useState(null); // Предпросмотр изображения
  const [userId, setUserId] = useState(0)
  const [isFileSelected, setIsFileSelected] = useState(false)
  const token = localStorage.getItem('jwtToken');
  const [userTrains, setUserTrains] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  // Шаблон данных пользователя
  const [userData, setUserData] = useState({
    // id: 11,
    name: null,
    surname: null,
    login: null,
    birthday: null,
    email: null,
    password: null,
    gender: null,
    age: null,
    role: "ROLE_USER",
    image: null,
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
    handleGetUserId();
  }, [targetId, userId]);

  useEffect(() => {
      // Проверяем, есть ли данные, и обновляем состояние
      if (cards?.content) {
          setFilteredData(cards.content);
      }
  }, [cards, targetId]);

  useEffect(() => {
    console.log("Обновленные данные:", userData);
    handleGetStats()
    handleSetUserTrains()
  }, []);

  useEffect(() => {
    if (filteredData?.length > 0) {
        const training = filteredData.find((item) => item.id === targetId); // Ищем тренировку с нужным ID
        if (training) {
            handleGetTrainStats(training); // Получаем статистику для найденной тренировки
        }
    }
  }, [filteredData, targetId]); // Выполняется при изменении filteredData или targetId


// Получение автора
const handleGetAuthor = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
      console.error("Токен отсутствует. Пользователь не авторизован.");
      return null;
  }

  try {
      const response = await fetch(`http://localhost:8081/users/lk`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          console.error(`Ошибка при получении автора: ${response.status}`);
          return null;
      }

      const data = await response.json();
      const author = `${data.name} ${data.surname}`;
      console.log("Автор найден:", author);
      return author;
  } catch (e) {
      console.error("Ошибка при выполнении запроса:", e);
      return null;
  }
};

// Получение тренировок автора
const handleSetUserTrains = async () => {
  try {
      const author = await handleGetAuthor();
      if (!author) {
          console.error("Автор не найден. Пропускаем выполнение запроса.");
          return;
      }

      const token = localStorage.getItem('jwtToken');
      if (!token) {
          console.error("Токен отсутствует. Невозможно выполнить запрос.");
          return;
      }

      const response = await fetch(`http://localhost:8081/trains?search=author:${author}`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          console.error(`Ошибка при получении тренировок: ${response.status}`);
          return;
      }

      const data = await response.json();
      if (data?.content) {
          console.log("Авторские тренировки:", data.content);
          setTotalPages(data.totalPages)
          
          const responsePage = await fetch(`http://localhost:8081/trains?search=author:${author}&page=${totalPages - 1}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          });
          const dataPage = await responsePage.json();
          console.log('DATA',dataPage)
          console.log(`http://localhost:8081/trains?search=author:${author}&page=${totalPages}`)
          setUserTrains(dataPage.content); // Устанавливаем данные тренировок
      } else {
          console.error("Ответ API не содержит контента.");
      }
  } catch (e) {
      console.error("Ошибка при выполнении запроса:", e);
  }
};


  const fetchUserImage = async (userId) => {
    const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
    if (!token) {
      console.error('Токен отсутствует. Пользователь не авторизован.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8081/users/${userId}/image`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Проверяем, что сервер вернул картинку
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image')) {
          const blob = await response.blob(); // Получаем данные в формате Blob
          const imageUrl = URL.createObjectURL(blob); // Генерируем URL для изображения
          setPreviewImage(imageUrl); // Устанавливаем URL в состояние previewImage
          console.log('Изображение успешно загружено.');
        } else {
          console.error('Ответ от сервера не является изображением.');
        }
      } else {
        console.error(`Ошибка загрузки изображения: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  
  useEffect(() => {
    if (userId) {
      fetchUserImage(userId);
    }
  }, [userId]);


const handleGetUserId = async () => {
  const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
  if (!token) {
    console.error('Токен отсутствует. Пользователь не авторизован.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8081/users/lk`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Ошибка: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log('Данные пользователя:', data);
    setUserId(data.id);
  } catch (error) {
    console.error('Ошибка получения данных об аккаунте:', error);
  }
};

const uploadImage = async (userId) => {
  if (isFileSelected === false) {
      console.warn('Файл не выбран.');
      return;
  }
  else {
    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log(`http://localhost:8081/users/${userId}/image`)
    try {
        console.log(`http://localhost:8081/users/${userId}/image`)
        const response = await fetch(`http://localhost:8081/users/${userId}/image`, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
              }
        });
        setSelectedFile(null)
        setIsFileSelected(false)
        if (response.ok) {
            console.log('Изображение успешно загружено.');
        } else {
            console.error('Ошибка при загрузке изображения:', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
  }
};

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


// Функция обработки выбора файла
const handleFileChange = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);
  setIsFileSelected(true)
  // Предпросмотр изображения
  const reader = new FileReader();
  reader.onload = (e) => setPreviewImage(e.target.result);
  reader.readAsDataURL(file);
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
          image: userData.image,
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

      if (isFileSelected === true) {
        await uploadImage(userId); // Загрузка нового изображения, если оно выбрано
      }
      
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
        console.log(response);
        setStats({
            used: response.data.used,
            duration: response.data.durationInMinutes,
            calories: 0,
            author: response.data.author
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
            {previewImage ? (
                <img src={previewImage} alt="Предпросмотр" className="personal-avatar" />
            ) : (
                <img src="..\src\img\negro_man.png" alt="Placeholder" className="personal-avatar" />
            )}
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
                
                <select
                  id="gender"
                  name="gender"
                  style={{borderRadius:'8px', padding: '2px', backgroundColor: '#DADADA', borderStyle: 'inset', borderWidth: '1px', fontFamily: 'UNCAGE'}}
                  value={userData.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">Выберите пол</option>
                  <option value="МУЖСКОЙ">МУЖСКОЙ</option>
                  <option value="ЖЕНСКИЙ">ЖЕНСКИЙ</option>
                </select>
                <label htmlFor="gender">Пол</label>
              </div>
              <div className="file-upload">
                  <label htmlFor="file-input" className="custom-file-upload">
                      Выбрать фото
                  </label>
                  <input
                      id="file-input"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden-file-input"
                  />
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
                        <li className="featured-workout-tag tag-kkal">автор: {stats.author}</li>
                    </ul>
                </div>
            </section>      
            <section className="history-trainings-desktop">
                <div className="wrapper">
                    <p className="wrapper-text">мои последние <br/>тренировки</p>
                </div>
                <div className="training-cards-container">
                    <ul className="training-cards">
                    {userTrains?.length > 0
                            ? userTrains.map((training) => (
                                <Training training={training} key={training.id} />
                            ))
                            : <p>Нет доступных тренировок</p>
                        }
                    </ul>
                </div>
            </section> 
        </main>
    </>
    )
}