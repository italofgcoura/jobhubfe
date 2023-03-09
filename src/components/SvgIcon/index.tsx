import { ReactComponent as Check } from '../../assets/done_black_24dp.svg';
import { ReactComponent as MoneyWage } from '../../assets/attach_money_black_24dp.svg';
import { ReactComponent as Seniority } from '../../assets/noun-seniority-2063262.svg';
import { ReactComponent as Calendar } from '../../assets/calendar_month_black_24dp.svg';
import { ReactComponent as SadFace } from '../../assets/sentiment_dissatisfied_black_24dp.svg';
import { ReactComponent as Google } from '../../assets/icons8-google.svg';
import { ReactComponent as CheckBox } from '../../assets/check_box_black_24dp.svg';
import { ReactComponent as CheckBoxBlank } from '../../assets/check_box_outline_blank_black_24dp.svg';
import { ReactComponent as Leave } from '../../assets/exit_to_app_black_24dp.svg';

const iconDictionary = {
  check: Check,
  moneyWage: MoneyWage,
  seniority: Seniority,
  calendar: Calendar,
  sadFace: SadFace,
  google: Google,
  checkBox: CheckBox,
  checkBoxBlank: CheckBoxBlank,
  leave: Leave
};

export type IconSource = keyof typeof iconDictionary;

interface IProps {
  source: IconSource;
  color?: string;
  width?: number;
  height?: number;
}

export default ({ source, color, width, height }: IProps) => {

  const Logo = iconDictionary[source];

  return <Logo fill={color} width={width ?? 24} height={height ?? 24} />;

};



