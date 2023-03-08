import RouterComponent from '../routes';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import { PagesContainer } from './styles';

export default () => {

  return (
    <>
      <Header />
      {/* <PagesContainer> */}
      <RouterComponent />
      {/* </PagesContainer> */}
      <Footer />
    </>
  );
};
