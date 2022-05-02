import TextElement, { TextColor, TextElementProps } from './TextElement';

interface CurrencyTextProps {
  value: number;
  color?: TextColor;
  TextElementProps?: TextElementProps;
}

const CurrencyText: React.FC<CurrencyTextProps> = ({
  value,
  color,
  TextElementProps,
}) => (
  <TextElement
    as="span"
    color={color || 'dark'}
    bold={true}
    {...TextElementProps}
  >
    {new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(value)}
  </TextElement>
);

export default CurrencyText;
