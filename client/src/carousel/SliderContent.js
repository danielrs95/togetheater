import styled from '@emotion/styled'

const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  display: flex;
`
export default SliderContent