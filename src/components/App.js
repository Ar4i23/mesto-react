import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlasePopup";
import DeletePupup from "./DeletePopup";

const App = () => {
  // states pupup's
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSending, setIsSending] = useState(false);
  // state context
  const [currentUser, setCurrentUser] = useState({});
  // state cards
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState({});
  // log("hello");

  // установка false всех pupup's
  const closeAllPopups = useCallback(() => {
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
  }, []);

  // закрытие pupup's на Esc и снятие влушателя keydown
  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [closeAllPopups]
  );

  // самая главная функция закрытия pupup's
  const handleClosePopup = useCallback(() => {
    closeAllPopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [closePopupByEsc, closeAllPopups]);

  // обработчик события keydown
  const setEvtLisenersForDoc = () => {
    document.addEventListener("keydown", closePopupByEsc);
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
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка при изменении аватарки: ${err}`))
      .finally(() => setIsSending(false));
  };

  // обработчик добавления новой card  на сервере и в UI
  const handleAddPlaceSubmit = (data, hendleClose) => {
    setIsSending(true);
    api.addCardByServer(data).then((newCard) => {
      setCards([newCard, ...cards]);
      hendleClose();
      setIsSending(false);
    });
  };

  // обработчик нажатия на card и открытие pupupImage
  // c навешиванием слушателя
  const handleCardClick = (data) => {
    setEvtLisenersForDoc();
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  };

  // обработчик нажатия на кнопку дабавления новой card
  // c навешиванием слушателя
  const handleAddPlacePopup = () => {
    setIsAddPlacePopupOpen(true);
    setEvtLisenersForDoc();
  };
  // обработчик нажатия на кнопку редактирования аватарки
  // c навешиванием слушателя
  const handleEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(true);
    setEvtLisenersForDoc();
  };
  // обработчик нажатия на кнопку редактирования профиля
  // c навешиванием слушателя
  const handleEditProfilePopup = () => {
    setIsEditProfilePopupOpen(true);
    setEvtLisenersForDoc();
  };
  // обработчик нажатия на иконку удаления
  // c навешиванием слушателя
  const handleDeletePlace = (card) => {
    setDeleteCardId(card);
    setEvtLisenersForDoc();
    setIsDeletePopupOpen(true);
  };

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <CurrentCardContext.Provider value={cards}>
          <Main
            onCardDelete={handleDeletePlace}
            onCardClick={handleCardClick}
            onAddPlace={handleAddPlacePopup}
            onEditAvatar={handleEditAvatarPopup}
            onEditProfile={handleEditProfilePopup}
            isLoading={isLoading}
            cards={cards}
          />
        </CurrentCardContext.Provider>
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
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
