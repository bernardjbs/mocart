import React, { useContext } from 'react';
import Nav from '../../components/nav/Nav';

import useUserContext from '../../hooks/useUserContext';

function PriceList() {
  const loggedInUser = useUserContext();

  return (
    <>
      <Nav />
      Pricelist
    </>
  )
};

export default PriceList;