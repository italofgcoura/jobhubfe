
import { Spinner } from './styles';

interface ISpinner {
  size?: number;
  centered?: boolean
}

export default ({ size, centered }: ISpinner) => {

  return <Spinner
    size={size || 36}
    centered={centered || false}
  />;
};

// export default Loader;
