import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  createImage,
  removeImageFromList,
  setDefaultSingleImageList,
} from 'redux/slicers/imagesSlicer';

export function useUploadImage(slideNum: number | undefined): any {
  const [progress, setProgress] = useState(0);

  const dispatch = useAppDispatch();

  async function uploadImage(options) {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    try {
      if (slideNum) {
        console.log(file);

        console.log(slideNum);
        await dispatch(setDefaultSingleImageList({ file, slideNum }));
      } else {
        await dispatch(setDefaultSingleImageList(file));
      }

      await dispatch(
        createImage({
          config,
          file,
        }),
      );

      onSuccess('Ok');
    } catch (error: any) {
      onError({ error });
    }
  }

  const handleRemoveImage = (options) => {
    // console.log(options)
    dispatch(removeImageFromList(options.name));
  };

  return {
    uploadImage,
    progress,
    handleRemoveImage,
  };
}
