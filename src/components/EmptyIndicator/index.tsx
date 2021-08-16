import { FC } from "react";

import "./EmptyIndicator.css";

const EmptyIndicator: FC<{ showImg?: boolean }> = ({
  children,
  showImg = true,
}) => {
  return (
    <div className="emptyIndicator">
      <h1 className="emptyIndicator__text">{children || "Empty"}</h1>
      {showImg && (
        <img
          className="emptyIndicator__img"
          src="/images/shopping-cart-light-icon.png"
          alt="empty indicator cart"
        />
      )}
    </div>
  );
};

export { EmptyIndicator };
