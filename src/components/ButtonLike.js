import React, { useEffect, useState } from "react";
import api from "../utils/Api";

const ButtonLike = ({ likes, myId, cardId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLiked(likes.some((i) => i._id === myId));
  }, [likes, myId]);

  // обработчик лайков с записью их на сервере
  const handleCardLike = () => {
    if (isLiked) {
      api
        .deleteLike(cardId)
        .then((newCard) => {
          setIsLiked(false);
          setCount(newCard.likes.length);
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`));
    } else {
      api
        .addLike(cardId)
        .then((newCard) => {
          setIsLiked(true);
          setCount(newCard.likes.length);
        })
        .catch((err) => console.error(`Ошибка при постановки лайка${err}`));
    }
  };
  return (
    <>
      <div className="element__box">
        <button
          onClick={handleCardLike}
          className={`element__button-like ${
            isLiked ? "element__button-like_active" : ""
          }`}
          type="button"
          aria-label="Кнопка лайк"
        ></button>
        <p className="element__counter-like">{count}</p>
      </div>
    </>
  );
};
export default ButtonLike;
