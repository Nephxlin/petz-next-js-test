import styled from "styled-components";

interface ISelectWrapperProps{
  row?: boolean;
}

export const SelectWrapper = styled.div<ISelectWrapperProps>`
  display: flex;
  flex-direction: column;
  ${({row}) => row && `
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: 16px 0px;
  `}
`

export const SelectStyled = styled.select<ISelectWrapperProps>`
  padding: 13px 14px;
  border: 1px solid #D5D5D5;
  border-radius:8px;
  width: ${({row}) => row ?`100%`: '265px'};
`

export const Label = styled.label<ISelectWrapperProps>`
  display: flex;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 0px;
  white-space: nowrap;
  padding-right: ${({row}) => row && '36px'};
`

export const Error = styled.span`
  color: red;
`