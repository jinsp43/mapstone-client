import "./MemberCard.scss";

const MemberCard = ({ name, colour, id }) => {
  return (
    <article className="member-card">
      {/* Allows dynamic setting of colour of person icon */}
      <svg
        className="member-card__icon"
        xmlns="http://www.w3.org/2000/svg"
        zoomAndPan="magnify"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
        viewBox="95.49 276.78 119.25 119.25"
      >
        <defs>
          <clipPath id="6c706f1a49">
            <path
              d="M 95.492188 276.78125 L 214.742188 276.78125 L 214.742188 396.03125 L 95.492188 396.03125 Z M 95.492188 276.78125 "
              clipRule="nonzero"
            />
          </clipPath>
        </defs>
        <g clipPath="url(#6c706f1a49)">
          <path
            fill={colour}
            d="M 212.808594 396.023438 L 97.433594 396.023438 C 96.386719 396.023438 95.539062 395.175781 95.539062 394.128906 L 95.539062 383.351562 C 95.539062 365.421875 110.128906 350.832031 128.0625 350.832031 L 182.179688 350.832031 C 200.109375 350.832031 214.699219 365.421875 214.699219 383.351562 L 214.699219 394.128906 C 214.699219 395.175781 213.851562 396.023438 212.808594 396.023438 Z M 155.121094 345.746094 C 136.105469 345.746094 120.636719 330.277344 120.636719 311.265625 C 120.636719 292.25 136.105469 276.78125 155.121094 276.78125 C 174.132812 276.78125 189.605469 292.25 189.605469 311.265625 C 189.605469 330.277344 174.132812 345.746094 155.121094 345.746094 Z M 155.121094 345.746094 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </svg>

      <div className="member-card__text">
        <p className="member-card__name">{name}</p>
      </div>
    </article>
  );
};

export default MemberCard;
