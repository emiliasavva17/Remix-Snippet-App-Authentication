import { CgClose, CgMenu } from "react-icons/cg";

const MobileMenu = ({ toggle, handleClick }) => {
  console.log(handleClick);
  return (
    <button onClick={handleClick}>
      {toggle ? <CgClose size={24} /> : <CgMenu size={24} />}
    </button>
  );
};

export default MobileMenu;
