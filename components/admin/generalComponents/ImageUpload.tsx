import { UploadOutlined } from '@ant-design/icons';
import { Button, Progress, Upload } from 'antd';
import { useUploadImage } from 'common/hooks/useUploadImage';

interface Props {
  fileList: any[];
  isProduct?: boolean;
  slideNum?: number;
}

const ImageUpload = ({ fileList, isProduct, slideNum }: Props) => {
  const { uploadImage, progress, handleRemoveImage } = useUploadImage(slideNum);

  return (
    <>
      <Upload
        listType="picture"
        customRequest={uploadImage}
        fileList={fileList}
        onRemove={handleRemoveImage}
      >
        {(isProduct || fileList.length < 1) && (
          <Button icon={<UploadOutlined />}> Загрузить</Button>
        )}
      </Upload>
      {progress > 0 && <Progress percent={progress} />}
    </>
  );
};

export default ImageUpload;
