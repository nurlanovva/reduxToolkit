import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIp } from '../model/ipSlice';
import { RootState, AppDispatch } from '../../../app/store';

const IpView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address, status, error } = useSelector((state: RootState) => state.ip);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIp());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = <p>Your IP Address: {address}</p>;
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>IP Address</h1>
      {content}
    </div>
  );
};

export default IpView;
