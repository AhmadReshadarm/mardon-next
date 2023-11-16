import { useState } from 'react';
import Delete from '../../assets/delete.svg';
import { handleImageDelete, handleSelectedImage } from './helpers';
import { useAppDispatch } from 'redux/hooks';

const Files = ({
  index,
  prodcutVariantIndex,
  image,
  isProducts,
  setOpen,
  slideNum,
}) => {
  const dispatch = useAppDispatch();
  const [isHover, setHover] = useState(false);
  const [content, setContent] = useState('Нажмите, чтобы скопировать URL');
  return (
    <li key={index}>
      <div className="image-container">
        <img
          src={`/api/images/${image.filename}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
          alt={image.originalName}
          onClick={handleSelectedImage(
            image,
            isProducts,
            dispatch,
            prodcutVariantIndex,
            setOpen,
            slideNum,
          )}
        />
      </div>

      <div className="title-wrapper">
        <span
          onClick={() => {
            if (!navigator?.clipboard) {
              console.warn('Clipboard not supported');
              return false;
            }
            navigator.clipboard.writeText(`/api/images/${image.filename}`);
            setContent('URL скопирован');
            setTimeout(() => {
              setContent('Нажмите, чтобы скопировать URL');
            }, 500);
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="file-name"
        >
          {image.originalName}
        </span>
        <span
          style={{
            display: isHover ? 'flex' : 'none',
            opacity: isHover ? 1 : 0,
          }}
          className="notification-copy"
        >
          {content}
        </span>
        <button
          onClick={() => handleImageDelete(image.filename, dispatch)}
          className="delete-wrapper"
        >
          <span>Удалить Файл</span>
          <span>
            <Delete />
          </span>
        </button>
      </div>
    </li>
  );
};

export default Files;
