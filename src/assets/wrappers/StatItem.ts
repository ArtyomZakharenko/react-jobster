import styled from 'styled-components'
import { StatItemProps } from "../../models/props/StatItemProps";

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props: StatItemProps) => props.color};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props: StatItemProps) => props.color};
  }

  .title {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin: 0.5rem 0 0;
  }

  .icon {
    width: 70px;
    height: 60px;
    background: ${(props: StatItemProps) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 2rem;
      color: ${(props: StatItemProps) => props.color};
    }
  }
`

export default Wrapper
