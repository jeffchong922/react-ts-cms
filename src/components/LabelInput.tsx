import React from 'react'
import styled, { css } from 'styled-components'

interface IColSpan {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

interface LabelProps {
  labelWidth: number;
  colon: boolean;
}
interface InputWrapperProps {
  labelWidth: number;
}
interface InputContainerProps {
  inputCol: IColSpan;
}


const LabelWrapper = styled.div`
  position: relative;
`
const Label = styled.label<LabelProps>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.4rem 0;
  width: ${props => props.labelWidth + 'rem'};
  text-align: end;

  ${props => props.colon && css`
    ::after {
      content: ':';
      padding-left: 0.1rem;
    }
  `}
`
const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  min-height: 32px;
  padding-left: 0.8rem;
  margin-left: ${props => props.labelWidth + 'rem'};
`
const InputContainer = styled.div<InputContainerProps>`
  width: ${
    ({ inputCol }) => inputCol.span ? getColWidth(inputCol.span) : '100%'
  };

  @media screen and (max-width: 576px) {
    ${
      ({ inputCol }) => inputCol.xs && 'width: ' + getColWidth(inputCol.xs)
    };
  }

  @media screen and (min-width: 576px) {
    ${
      ({ inputCol }) => inputCol.sm && 'width: ' + getColWidth(inputCol.sm)
    };
  }

  @media screen and (min-width: 768px) {
    ${
      ({ inputCol }) => inputCol.md && 'width: ' + getColWidth(inputCol.md)
    };
  }

  @media screen and (min-width: 922px) {
    ${
      ({ inputCol }) => inputCol.lg && 'width: ' + getColWidth(inputCol.lg)
    };
  }
  @media screen and (min-width: 1200px) {
    ${
      ({ inputCol }) => inputCol.xl && 'width: ' + getColWidth(inputCol.xl)
    };
  }
  @media screen and (min-width: 1600px) {
    ${
      ({ inputCol }) => inputCol.xxl && 'width: ' + getColWidth(inputCol.xxl)
    };
  }
`
function getColWidth (val: number) {
  return val >= 24
    ? '100%'
    : val <= 1
      ? (1/24*100) + '%'
      : (val/24*100) + '%'
}

interface LabelInputProps {
  label: string;
  colon?: boolean;
  labelWidth?: number;
  inputCol?: IColSpan;
  children: React.ReactNode;
}
const LabelInput: React.FC<LabelInputProps> = ({ label, labelWidth = 4, children, colon = false, inputCol = {} }) => (
  <LabelWrapper>
    <Label labelWidth={labelWidth} colon={colon}>{label}</Label>
    <InputWrapper labelWidth={labelWidth}>
      <InputContainer inputCol={inputCol}>
      {children}
      </InputContainer>
    </InputWrapper>
  </LabelWrapper>
)

export default LabelInput