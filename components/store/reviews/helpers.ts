import { openErrorNotification } from 'common/helpers';
import { AppDispatch } from 'redux/store';
import { createImage } from 'redux/slicers/imagesSlicer';
const handleFileChange = async (
  event: any,
  setSrc: any,
  dispatch: AppDispatch,
  setUploadBtnAvailable,
) => {
  setUploadBtnAvailable(false);
  const fileObj = event.target.files;
  if (!fileObj[0]) {
    return;
  }
  if (fileObj.length > 4) {
    openErrorNotification('запрещено более 4 файлов');
    return;
  }
  const imagesUrl: any = [];
  for (let i = 0; i < fileObj.length; i++) {
    const restriction = 5242880;
    if (fileObj[i].size > restriction) {
      openErrorNotification(
        `Размер файла ${fileObj[i].name} более 5 МБ не допускается.`,
      );
      return;
    }
    imagesUrl.push(URL.createObjectURL(fileObj[i]));

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    try {
      await dispatch(
        createImage({
          config,
          file: fileObj[i],
        }),
      );
    } catch (error: any) {}
  }
  setSrc(imagesUrl);
};

export { handleFileChange };
