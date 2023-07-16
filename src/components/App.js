import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Layout from "./Layout";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlasePopup";
import DeletePupup from "./DeletePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import apiAuth from "../utils/ApiAuth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  // states pupup's
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // state для Tooltip
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);

  // state для отрисовки отправки данных на сервер и показания ожидания
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // state context
  const [currentUser, setCurrentUser] = useState({});

  // state для информации email user'а
  const [userEmail, setUserEmail] = useState("");

  // state cards
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState({});

  // state для авторизации
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // установка false всех pupup's
  const closeAllPopups = useCallback(() => {
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsResultPopupOpen(false);
  }, []);

  // самая главная функция закрытия pupup's
  const handleClosePopup = useCallback(() => {
    closeAllPopups();
  }, [closeAllPopups]);

  useEffect(() => {
    const closePopupByEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closePopupByEsc);
    return () => {
      document.removeEventListener("keydown", closePopupByEsc);
    };
  }, []);
  // обработчик Регистрации
  const handleRegister = (data, resetInput) => {
    setIsSending(true);
    apiAuth
      .signup(data)
      .then(() => {
        setIsResultPopupOpen(true);
        setSuccessful(true);
        resetInput();
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setSuccessful(false);
        console.error(`Ошибка при регистрации: ${err}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };
  // обработчик Входа
  const handleLogin = (data, resetInput) => {
    setIsSending(true);
    apiAuth
      .signin(data)
      .then((data) => {
        localStorage.setItem("token", data.token);
        resetInput();
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setSuccessful(false);
        console.error(`Ошибка при авторизации: ${err}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // запрос информации user'а and cards с сервера
  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        setIsLoading(false);
      })
      .catch((err) => console.error(`Ошибка при загрузки данных: ${err}`));
  }, []);

  // запрос на повторный вход
  useEffect(() => {
    if (localStorage.token) {
      apiAuth
        .getUsersMe(localStorage.token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(`Ошибка при повторном входе:${err}`);
        });
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  // обработчик  удаления карточки на сервере и из UI
  const handleCardDelete = () => {
    setIsSending(true);
    api
      .deleteCardByServer(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((c) => {
            return c._id !== deleteCardId._id;
          })
        );
        handleClosePopup();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setIsSending(false));
  };

  // обработчик изменения информации user'а на сервере и в UI
  const handleUpdateUser = (data, hendleClose) => {
    setIsSending(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        hendleClose();
        setIsSending(false);
      })
      .catch((err) =>
        console.error(`Ошибка при изменении данных профиля: ${err}`)
      )
      .finally(() => setIsSending(false));
  };

  // обработчик изменений аватакки user'а на сервере и в UI
  const handleUpdateAvatar = (data, hendleClose) => {
    setIsSending(true);
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        hendleClose();
      })
      .catch((err) => console.error(`Ошибка при изменении аватарки: ${err}`))
      .finally(() => setIsSending(false));
  };

  // обработчик добавления новой card  на сервере и в UI
  const handleAddPlaceSubmit = (data, hendleClose) => {
    setIsSending(true);
    api
      .addCardByServer(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        hendleClose();
      })
      .catch((err) =>
        console.error(`Ошибка при добавлении нового места: ${err}`)
      )
      .finally(() => setIsSending(false));
  };

  // обработчик нажатия на card и открытие pupupImage
  const handleCardClick = (data) => {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  };

  // обработчик нажатия на кнопку дабавления новой card
  const handleAddPlacePopup = () => {
    setIsAddPlacePopupOpen(true);
  };
  // обработчик нажатия на кнопку редактирования аватарки
  const handleEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(true);
  };
  // обработчик нажатия на кнопку редактирования профиля
  const handleEditProfilePopup = () => {
    setIsEditProfilePopupOpen(true);
  };
  // обработчик нажатия на иконку удаления
  const handleDeletePlace = (card) => {
    setDeleteCardId(card);
    setIsDeletePopupOpen(true);
  };

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Layout}
                onCardDelete={handleDeletePlace}
                onCardClick={handleCardClick}
                onAddPlace={handleAddPlacePopup}
                onEditAvatar={handleEditAvatarPopup}
                onEditProfile={handleEditProfilePopup}
                isLoading={isLoading}
                isSending={isSending}
                userEmail={userEmail}
                loggedIn={loggedIn}
                cards={cards}
                name="main"
                linkText="Выход"
              />
            }
          />
          <Route
            path="sign-in"
            element={
              <>
                <Header name="signin" linkText="Регистрация" />
                <Main
                  name="signin"
                  isSending={isSending}
                  onSubmit={handleLogin}
                />
              </>
            }
          />
          <Route
            path="sign-up"
            element={
              <>
                <Header name="signup" linkText="Вход" />
                <Main
                  name="signup"
                  isSending={isSending}
                  onSubmit={handleRegister}
                />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          onClose={handleClosePopup}
          isOpen={isEditProfilePopupOpen}
          isSending={isSending}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={handleClosePopup}
          isOpen={isEditAvatarPopupOpen}
          isSending={isSending}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          onClose={handleClosePopup}
          isOpen={isAddPlacePopupOpen}
          isSending={isSending}
        />
        <DeletePupup
          onDeletePlace={handleCardDelete}
          onClose={handleClosePopup}
          isOpen={isDeletePopupOpen}
          isSending={isSending}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={handleClosePopup}
        />
        <InfoTooltip
          isOpen={isResultPopupOpen}
          successful={successful}
          onClose={handleClosePopup}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
