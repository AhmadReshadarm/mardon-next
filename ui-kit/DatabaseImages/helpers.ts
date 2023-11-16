import { AppDispatch } from 'redux/store';
import { Image } from 'swagger/services';
import { setDefaultImageList } from 'redux/slicers/mutipleImagesSlicer';
import {
  setDefaultSingleImageList,
  deleteImage,
} from 'redux/slicers/imagesSlicer';

const handleImageDelete = async (fileName: string, dispatch: AppDispatch) => {
  dispatch(deleteImage({ fileName }));
};

const handleSelectedImage =
  (
    image: Image,
    isProducts: boolean,
    dispatch: AppDispatch,
    index: number,
    setOpen,
    slideNum,
  ) =>
  () => {
    if (isProducts) {
      dispatch(
        setDefaultImageList({
          file: { name: image.filename, url: `/api/images/${image.filename}` },
          index,
        }),
      );
    } else if (slideNum) {
      dispatch(
        setDefaultSingleImageList({
          name: image.filename,
          slideNum,
          url: `/api/images/${image.filename}`,
          fromDB: true,
        }),
      );
    } else {
      dispatch(
        setDefaultSingleImageList({
          name: image.filename,
          url: `/api/images/${image.filename}`,
        }),
      );
    }

    setOpen(false);
  };

export { handleImageDelete, handleSelectedImage };
