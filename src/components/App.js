import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState("");
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState(false);
  function closeAllPopups(evt) {
    if (
      evt.target.className === "modal modal_opened" ||
      evt.target.className === "modal__close"
    ) {
      setIsAddPlacePopupOpen(false);
      setSelectedCard(false);
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
    }
  }
  function handleCardClick(src, name) {
    setSelectedCard({ isOpen: true, src, name });
  }

  return (
    <div>
      <Header />
      <Main
        onCardClick={handleCardClick}
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
      />
      <Footer />
      <PopupWithForm
        name="my-modal-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={"Сохранить"}
      >
        <input
          id="link-avatar"
          name="avatar"
          type="url"
          className="modal__input modal__input_linking"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="modal__error" id="link-avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="my-modal-edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={"Сохранить"}
      >
        <input
          id="name-edit"
          name="name"
          type="text"
          className="modal__input modal__input_modal_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="modal__error" id="name-edit-error"></span>
        <input
          id="about-edit"
          name="about"
          type="text"
          className="modal__input modal__input_modal_about"
          placeholder="Обо мне"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="modal__error" id="about-edit-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="my-modal-cread"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText={"Сохранить"}
      >
        <input
          id="name-cread"
          name="name"
          type="text"
          className="modal__input modal__input_naming"
          placeholder="Название картинки"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="modal__error" id="name-cread-error"></span>
        <input
          id="link-cread"
          name="link"
          type="url"
          className="modal__input modal__input_linking"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="modal__error" id="link-cread-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="my-modal-delete"
        title="Вы уверены?"
        buttonText={"Да"}
      >
        <button
          className="modal__close"
          id="close-delete"
          type="button"
        ></button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
