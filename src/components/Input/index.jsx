import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';
import { useField } from "@unform/core"


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
    <Container>
      { Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur = {handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        type={type}
        {...rest}
      />
    </Container>

  )

};

Input.propTypes = {
  name: PropTypes.string.isRequired,
}
