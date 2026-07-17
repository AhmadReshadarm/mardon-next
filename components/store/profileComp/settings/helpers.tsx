import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import { UserService } from 'swagger/services';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
import { updateUserById } from 'redux/slicers/authSlicer';
import {
  createSubscriber,
  deleteSubscriber,
} from 'redux/slicers/subscriberSlicer';
const InputsTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.textPrimary,
    color: color.btnPrimary,
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: `0px 2px 6px ${color.boxShadowBtn}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    borderRadius: '15px',
    padding: '15px',
    userSelect: 'none',
  },
}));

const handleSubscribtion = (
  name: string,
  email: string,
  dispatch,
  Subscriber,
) => {
  if (Subscriber) {
    dispatch(deleteSubscriber(email));
    return;
  }
  if (!Subscriber) {
    dispatch(createSubscriber({ name, email }));
    return;
  }
};

const handleEmailChange = async ({ user, email, dispatch }) => {
  if (email == user.email) {
    openErrorNotification('Ничего не изменилось.');
    return;
  }

  dispatch(
    updateUserById({
      userId: user?.id!,
      user: { email },
    }),
  );
};

const handleDataChange = async ({ user, payload, dispatch }) => {
  if (
    user.firstName == payload.firstName &&
    user.lastName == payload.lastName
  ) {
    openErrorNotification('Ничего не изменилось');
    return;
  }
  if (payload.firstName.length > 20 || payload.lastName.length > 20) {
    openErrorNotification('Максимально допустимое количество символов: 20');
    return;
  }
  dispatch(
    updateUserById({
      userId: user?.id!,
      user: { firstName: payload.firstName, lastName: payload.lastName },
    }),
  );
};

export {
  InputsTooltip,
  handleEmailChange,
  handleDataChange,
  handleSubscribtion,
};
