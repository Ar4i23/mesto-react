import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setUserAvatar(user.avatar);
        setUserName(user.name);
        setUserDescription(user.about);
      })
      .catch((err) =>
        console.error(`Ошибка при загрузки данны пользователя: ${err}`)
      );
  }, []);
  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(
          cards.map((card) => ({
            id: card._id,
            src: card.link,
            name: card.name,
            lengthLike: card.likes.length,
          }))
        );
      })
      .catch((err) => console.error(`Ошибка при загрузки карточек: ${err}`));
  }, []);
  return (
    <>
      <main className="content">
        <section className="profile">
          <div
            className="profile__image-ellipse"
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={onEditAvatar}
          ></div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__info-title">{userName}</h1>

              <button
                className="profile__info-edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__info-subtitle">{userDescription}</p>
          </div>
          <button
            className="profile__add-botton"
            aria-label="Кнопка добавить"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements">
          {cards.map(({ id, ...props }) => (
            <Card onCardClick={onCardClick} key={id} {...props} />
          ))}
        </section>
      </main>
    </>
  );
}
export default Main;
