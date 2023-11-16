import { Button, Form, Input, Select, Spin, Switch } from 'antd';
import { InsertRowLeftOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import {
  clearImageList,
  setDefaultSingleImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import { News } from 'swagger/services';
import color from 'components/store/lib/ui.colors';
import DatabaseImages from 'ui-kit/DatabaseImages';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import styles from './brands.module.scss';
import { handleFormSubmitBrands } from './helpers';
import { ManageNewsPostFields } from './ManageNewsPostsFields.enum';
import { handleFalsyValuesCheck } from '../../../common/helpers/handleFalsyValuesCheck.helper';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);
import draftToHtml from 'draftjs-to-html';
import { uploadImage } from '../products/helpers';
import DOMPurify from 'dompurify';
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  const isConvertable = (data) => {
    if (typeof JSON.parse(data) == 'object') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (
      !isLoading &&
      newsPost &&
      isJsonString(newsPost.post) &&
      isConvertable(newsPost.post) &&
      newsPost.post !== ''
    ) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(newsPost.post!)),
        ),
      );
    }
  }, [newsPost]);

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

  const isDisabled: boolean = handleFalsyValuesCheck(titleDB, url, imageList);

  const fontSizes: number[] = [];
  for (let index = 0; index < 97; index++) {
    if (index !== 0) {
      fontSizes.push(index);
    }
  }

  // _________________________ preview converter _______________________
  const [convertedContent, setConvertedContent] = useState(null);
  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlOutput = draftToHtml(rawContentState);
    setConvertedContent(htmlOutput);
  }, [editorState]);

  function createMarkup(html) {
    if (typeof window !== 'undefined') {
      const domPurify = DOMPurify(window);
      return {
        __html: domPurify.sanitize(html),
      };
    }
  }

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
          onFinish={handleFormSubmitBrands(router, dispatch, imageList)}
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
          <FormItem
            option={ManageNewsPostFields.Post}
            children={
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                editorStyle={{
                  border: `1px solid ${color.textSecondary}`,
                  borderRadius: '5px',
                }}
                localization={{ locale: 'ru' }}
                toolbar={{
                  fontFamily: {
                    options: ['Jost', 'Anticva'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                  image: {
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    urlEnabled: true,
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: (file) => uploadImage(file, dispatch),
                    previewImage: true,
                    inputAccept:
                      'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    alt: { present: true, mandatory: false },
                    defaultSize: {
                      height: 'auto',
                      width: 'auto',
                    },
                  },
                  fontSize: {
                    options: fontSizes,
                  },
                }}
              />
            }
          />
          <div className="preview-wrapper">
            <h1>Просмотр:</h1>
            <div
              className="preview-advertisment"
              dangerouslySetInnerHTML={createMarkup(convertedContent)}
            ></div>
          </div>
          <Form.Item className={styles.createBrandForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createBrandForm__buttonsStack__submitButton}
              loading={isSaveLoading}
              disabled={isDisabled}
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
