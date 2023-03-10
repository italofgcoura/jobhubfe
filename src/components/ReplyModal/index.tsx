import { useState } from 'react';
import handleInputChange from '../../utils/handleInputChange';
import ActionButton from '../ActionButton';
import InputContainer from '../InputContainer';
import Modal from '../Modal';
import SvgIcon from '../SvgIcon';
import Spinner from '../Spinner';
import { useTheme } from 'styled-components';
import { AxiosResponse } from 'axios';
import Message from '../Message';

interface iProps {
  showRepplyModal: boolean,
  onCloseModal: () => void,
  handleSubmitRepply: (...args: any) => Promise<AxiosResponse<any, any>>,
}

export default ({ showRepplyModal, onCloseModal, handleSubmitRepply }: iProps) => {

  if (!showRepplyModal) return null;

  const theme = useTheme();

  const [repply, setRepply] = useState({ text: '' });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const handleSubmit = async () => {
    setIsSubmiting(true);
    try {
      await handleSubmitRepply(repply.text);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setIsSubmiting(false);
    }

  };

  return (
    <Modal>
      <div style={{
        width: '550px', height: '300px',
        backgroundColor: theme.pageBackgroundColor,
        borderRadius: 4,
        padding: 24, display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxShadow: `0px 0px 10px ${theme.text}`
      }}>
        <h3 style={{ color: theme.text }}>RESPOSTA</h3>
        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setRepply, repply)}
          name='text'
          type='text'
          labelName='Resposta'
          value={repply.text}
          isTextArea
        />


        {success === true && <Message message='Resposta enviada com sucesso.' success />}

        {success === false && <Message message='Ocorreu um erro ao enviar a resposta.' />}

        {success === undefined &&
          <ActionButton>
            <button
              disabled={repply.text.length < 5 || isSubmiting}
              onClick={handleSubmit}
              style={{ position: 'relative' }}
            >ENVIAR RESPOSTA  {isSubmiting && <Spinner size={10} />}</button>

          </ActionButton>
        }

        <button
          onClick={onCloseModal}
          disabled={isSubmiting}
          style={{
            position: 'absolute', right: 0, top: 0,
            backgroundColor: 'transparent', border: 'none', cursor: 'pointer'
          }}
        >
          <SvgIcon source='fail' color={isSubmiting ? theme.colors.GRAY[700] : theme.colors.RED[900]} />
        </button>
      </div>
    </Modal>
  );
};
