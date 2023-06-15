import React from "react";
function Card({ src, name, lengthLike, onCardClick }) {
  return (
    <>
      <article className="element">
        <button className="element__button-delete"></button>
        <img
          className="element__image"
          src={src}
          alt={name}
          onClick={() => {
            onCardClick(src, name);
          }}
        />
        <div className="element__group">
          <h2 className="element__title">{name}</h2>
          <div className="element__box">
            <button
              className="element__button-like"
              type="button"
              aria-label="Кнопка лайк"
            ></button>
            <p className="element__counter-like">{lengthLike}</p>
          </div>
        </div>
      </article>
    </>
  );
}
export default Card;
