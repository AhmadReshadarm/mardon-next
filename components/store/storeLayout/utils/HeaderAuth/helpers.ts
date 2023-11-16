import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from '../../constants';
import { AuthService, UserService } from 'swagger/services';
import { signout } from 'redux/slicers/authSlicer';

const handleAfterAuthorized =
  (
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
    setIsOpened: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev === PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    });
  };

export { handleAfterAuthorized };
