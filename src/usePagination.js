import { useEffect } from 'react';

const usePagination = async (promise) => {
  useEffect(() => {
    async function init() {
      console.log(await promise());
    }

    init();
  }, [promise]);

  return {}
}

export default usePagination;