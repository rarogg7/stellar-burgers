import { FC, memo } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div data-cy='modal' className={styles.modal}>
        <div className={styles.header}>
          <h3
            className={`${styles.title} text text_type_main-large`}
            style={{ fontFamily: 'Iceland' }}
          >
            {title}
          </h3>
          <button data-cy='modal-close' className={styles.button} type='button'>
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
