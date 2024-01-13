import { Button, Form, Input, Spin, Switch } from 'antd';
import { InsertRowLeftOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Page } from 'routes/constants';
import { News } from 'swagger/services';
import DatabaseImages from 'ui-kit/DatabaseImages';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import styles from './brands.module.scss';
import { handleFormSubmitBrands } from './helpers';
import { ManageNewsPostFields } from './ManageNewsPostsFields.enum';
import dynamic from 'next/dynamic';
import {
  clearImageList,
  setDefaultSingleImageList,
} from 'redux/slicers/imagesSlicer';
const Editor = dynamic(() => import('ui-kit/Editor'), {
  ssr: false,
});

// _________________

type Props = {
  title: string;
  newsPosts: News[];
  newsPost?: News;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

// _______________

const ManageNewsPostForm = ({
  title,
  newsPosts,
  newsPost,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  // ________________
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    description: newsPost?.description,
    title: newsPost?.title,
    url: newsPost?.url,
    image: newsPost?.image,
    showOnMain: newsPost?.showOnMain,
  };

  // _______________
  const [isOpen, setOpen] = useState(false);
  const [url, setUrl] = useState<string>();
  const [titleDB, setTitle] = useState<string>();
  const imageList = useAppSelector((state) => state.images.imageList);

  // ------------------- descrption editor hooks -----------------------
  const [editorModal, setEditorModal] = useState(newsPost?.post! ?? '');
  const handleEditorChange = (evt) => {
    setEditorModal(evt);
  };

  useEffect(() => {
    if (newsPost) {
      setUrl(newsPost?.url);
      setTitle(newsPost.title);
    }

    if (newsPost?.image) {
      dispatch(
        setDefaultSingleImageList({
          name: newsPost.image,
          url: `/api/images/${newsPost?.image}`,
        }),
      );
    }
  }, [newsPost]);

  useEffect(() => {
    dispatch(clearImageList());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setEditorModal(newsPost?.post!);
    }, 500);
  }, [newsPost, editMode]);
  // ---------------------------------------------------------------

  return (
    <>
      <div className={styles.createBrandHeader}>
        <h1 className={styles.createBrandHeader__title}>{title}</h1>
      </div>
      {(isLoading || !newsPost) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitBrands(
            router,
            dispatch,
            imageList,
            editorModal,
          )}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createBrandForm}
        >
          <FormItem
            option={ManageNewsPostFields.Title}
            children={
              <Input
                required={true}
                placeholder="Введите Заголовок Новости"
                onChange={(e) => setTitle(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageNewsPostFields.Url}
            children={
              <Input
                required={true}
                placeholder="Введите URL Новости"
                onChange={(e) => setUrl(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageNewsPostFields.Description}
            children={
              <TextArea
                required={true}
                rows={4}
                placeholder="Краткое описание"
              />
            }
          />
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Показать на главной странице
          </label>
          <Form.Item
            name={ManageNewsPostFields.ShowOnMain}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name={ManageNewsPostFields.Image}>
            <ImageUpload fileList={imageList} />
            <ButtonDevider>
              {imageList.length < 1 && (
                <Button
                  onClick={() => setOpen(true)}
                  icon={<InsertRowLeftOutlined />}
                >
                  Выбрать из базы данных
                </Button>
              )}
            </ButtonDevider>

            <DatabaseImages
              isProducts={false}
              setOpen={setOpen}
              isOpen={isOpen}
            />
          </Form.Item>
          {/* --------------------- editor -------------------------- */}
          <FormItem
            option={ManageNewsPostFields.Post}
            children={
              <Editor
                handleEditorChange={handleEditorChange}
                editorModal={editorModal}
              />
            }
          />
          <Form.Item className={styles.createBrandForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createBrandForm__buttonsStack__submitButton}
              loading={isSaveLoading}
              // disabled={isDisabled}
            >
              {newsPosts ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_NEWS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const ButtonDevider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 20px 0;
`;

export default ManageNewsPostForm;
