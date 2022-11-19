import { useGlobalState } from "../../hooks/globalState";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import {
  FaceDizzy,
  FaceDissatisfied,
  FaceNeutral,
  FaceSatisfied,
  FaceCool,
} from "@carbon/icons-react";

import "./style.scss";

const customIcons = {
  1: {
    icon: <FaceDizzy size={36} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <FaceDissatisfied size={36} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <FaceNeutral size={36} />,
    label: "Neutral",
  },
  4: {
    icon: <FaceSatisfied size={36} />,
    label: "Satisfied",
  },
  5: {
    icon: <FaceCool size={36} />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function BasicRating({ disabled }) {
  const { lightMode, bookInfo, setBookInfo } = useGlobalState();
  return (
    <div id="ratingContainer">
      <p
        style={{ color: disabled ? "#b5b5b5" : lightMode ? "black" : "white" }}
      >
        Nota final:
      </p>
      <Rating
        disabled={disabled}
        name="highlight-selected-only"
        value={bookInfo.score || null}
        IconContainerComponent={IconContainer}
        highlightSelectedOnly
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#0E61FE",
          },
          "& .MuiRating-iconEmpty": {
            color: "#b5b5b5",
          },
        }}
        onChange={(e, newValue) => {
          console.log(newValue);
          const clone = { ...bookInfo };
          clone.score = newValue;
          setBookInfo(clone);
        }}
      />
    </div>
  );
}
