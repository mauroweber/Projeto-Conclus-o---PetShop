import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import {FiAlertCircle} from 'react-icons/fi'
import { useField } from "@unform/core";
import { Container, Error } from './styles';
import { InsertDriveFile } from '@material-ui/icons';


export default function Input({
  icon: Icon,
  name,
  type,
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);


  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        type={type}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>

  )

};

Input.propTypes = {
  name: PropTypes.string.isRequired,
}
