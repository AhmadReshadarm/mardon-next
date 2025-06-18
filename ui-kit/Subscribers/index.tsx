import color from 'components/store/lib/ui.colors';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UsePagination, handleSubscriber, handleAdminCall } from './helpers';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { paginateTo } from 'components/store/checkout/constant';
import InputMask from 'react-input-mask';
import { changeOrderCallFormState } from 'redux/slicers/store/globalUISlicer';
import { TGlobalUIState } from 'redux/types';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
import Image from 'next/image';
import styles from './subscribers.module.css';

const Subscribers = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [subscriber, setSubscriber] = useState({ name: '', email: '' });
  const [client, setClient] = useState({ clientName: '', phone: '' });
  const [direction, authType, paginate] = UsePagination();
  const { isOrderCallFormActive } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const { isInViewport, ref } = useInViewport();

  return (
    <div
      className={styles.Container}
      style={{
        backgroundColor: isOrderCallFormActive
          ? '#595959'
          : color.backgroundSecondery,
      }}
      ref={ref}
    >
      {isInViewport ? (
        <div
          className={styles.FormContainer}
          onFocus={() => dispatch(changeOrderCallFormState(true))}
          onBlur={() => dispatch(changeOrderCallFormState(false))}
        >
          <div className={styles.FormContent}>
            <div className={styles.news_letter_image_wrapper}>
              <Image
                src="/static/news-letter-static.jpg"
                alt="Запросить звонок"
                width={0}
                height={0}
                sizes="100vw"
                loading="lazy"
                priority={false}
              />
            </div>
            <div className={styles.news_letter_form_wrapper}>
              <div className={styles.news_letter_content_parent}>
                <div className={styles.AuthTabWrapper}>
                  <motion.div
                    animate={authType == 'call' ? 'init' : 'animate'}
                    variants={{ init: { x: 0 }, animate: { x: 200 } }}
                    className={styles.auth_page_indecator}
                  />
                  <div className={styles.auth_buttons_row}>
                    <h2
                      className={authType == 'call' ? styles.active_tab : ''}
                      onClick={() => paginate(paginateTo.forward, 'call')}
                    >
                      {`Заказать звонок`.toUpperCase()}
                    </h2>
                    <span>/</span>
                    <h2
                      className={
                        authType == 'subscribe' ? styles.active_tab : ''
                      }
                      onClick={() => paginate(paginateTo.back, 'subscribe')}
                    >
                      {`Подпишитесь`.toUpperCase()}
                    </h2>
                  </div>
                </div>
                <div className={styles.content_row_wrapper}>
                  <motion.div
                    className={styles.Content}
                    dragConstraints={{ left: 0, right: 0 }}
                    custom={direction}
                    variants={variants.authorizeSlideX}
                    animate={authType == 'call' ? 'center' : 'enter'}
                  >
                    <span className={styles.feild_lable_text}>
                      Оставьте заявку на нашем сайте и мы обязательно Вам
                      перезвоним в ближайшее время
                    </span>
                    <div className={styles.inputs_wrapper}>
                      <input
                        value={client.clientName}
                        placeholder="Введите Ваше Имя"
                        type="text"
                        onChange={(evt) =>
                          setClient({ ...client, clientName: evt.target.value })
                        }
                      />

                      <InputMask
                        mask="+7 (999) 999 99 99"
                        value={client.phone}
                        disabled={false}
                        maskChar=" "
                        onChange={(evt) =>
                          setClient({ ...client, phone: evt.target.value })
                        }
                        style={{ padding: '16.5px 14px' }}
                      >
                        {() => (
                          <input
                            placeholder="Введите Ваш номер телефона"
                            type="text"
                          />
                        )}
                      </InputMask>
                    </div>
                    <button
                      className={styles.ActionBtn}
                      onClick={handleAdminCall(
                        client.clientName,
                        client.phone,
                        dispatch,
                      )}
                      aria-label="ЗАКАЗАТЬ ЗВОНОК"
                    >
                      <span>ЗАКАЗАТЬ ЗВОНОК</span>
                    </button>
                  </motion.div>
                  <motion.div
                    className={styles.Content}
                    dragConstraints={{ left: 0, right: 0 }}
                    custom={direction}
                    variants={variants.authorizeSlideX}
                    animate={authType == 'subscribe' ? 'center' : 'enter'}
                  >
                    <span className={styles.feild_lable_text}>
                      Подпишитесь на рассылку новостей
                    </span>
                    <div className={styles.inputs_wrapper}>
                      <input
                        value={subscriber.name}
                        placeholder="Введите Ваше Имя"
                        type="text"
                        onChange={(evt) =>
                          setSubscriber({
                            ...subscriber,
                            name: evt.target.value,
                          })
                        }
                      />
                      <input
                        value={subscriber.email}
                        placeholder="Введите Ваш почтовый адрес"
                        type="email"
                        onChange={(evt) =>
                          setSubscriber({
                            ...subscriber,
                            email: evt.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      className={styles.ActionBtn}
                      onClick={handleSubscriber(
                        subscriber.name,
                        subscriber.email,
                        dispatch,
                      )}
                      aria-label="ПОДПИСАТЬСЯ"
                    >
                      <span>ПОДПИСАТЬСЯ</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Subscribers;
