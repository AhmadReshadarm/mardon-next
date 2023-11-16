import styled from 'styled-components';
import color from '../lib/ui.colors';
import Link from 'next/link';
import VKSVG from '../../../assets/vkcolored.svg';
import TelegraSVG from '../../../assets/telegramcolored.svg';
import WhatsappSVG from '../../../assets/whatsappcolored.svg';

const Footer = () => {
  const copyRighYear = new Date().getFullYear();
  return (
    <Container>
      <Wrapper>
        <Link href="/copyright-terms">
          <span>© {copyRighYear} «Fingarden». Все права защищены.</span>
        </Link>
        <SocialWrapper>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://vk.com/fingarden"
          >
            <span>
              <VKSVG />
            </span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/fingarden"
          >
            <span>
              <TelegraSVG />
            </span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/+79313539004"
          >
            <span>
              <WhatsappSVG />
            </span>
          </Link>
        </SocialWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${color.textSecondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${color.textPrimary};
    &:hover {
      color: ${color.hoverBtnBg};
    }
  }
`;

const SocialWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    span {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export default Footer;
