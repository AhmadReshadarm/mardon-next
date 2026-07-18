import { resetPswByToken } from 'redux/slicers/authSlicer';

const handleResetClick = async (
  evt: any,
  userPassword: string,
  router: any,
  dispatch,
) => {
  evt.preventDefault();
  const regEx = /[^\/]+$/; // get everything after last /
  const token = router.asPath.match(regEx).toString();

  const payload = { token, userPassword: userPassword };
  dispatch(resetPswByToken(payload));
  router.push('/profile');
};

export { handleResetClick };
