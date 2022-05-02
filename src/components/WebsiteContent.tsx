import Wrapper from './Wrapper';
import Container from './Container';

interface WebsiteContentProps {
  isMainBg?: boolean;
  children: React.ReactNode;
}

/**
 * Convenience component to wrap elements in a max-width container
 */
const WebsiteContent: React.FC<WebsiteContentProps> = ({
  isMainBg,
  children,
}) => {
  return (
    <Wrapper mainBg={isMainBg}>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default WebsiteContent;
