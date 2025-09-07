import css from "./Contact.module.css";

import { FaPhoneAlt, FaUserAlt } from "react-icons/fa";


export default function Contact({ contact, onDelete }) {
  return (
    <div className={css["contact-container"]}>
      <div className={css["name-number-container"]}>
        <div className={css["icon-name-container"]}>
          <FaUserAlt size={18}/>
          <p>{contact.name}</p>
        </div>
        <div className={css["icon-name-container"]}>
          <FaPhoneAlt className={css.phone} size={14} />
          <p>{contact.number}</p>
        </div>
      </div>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
}
